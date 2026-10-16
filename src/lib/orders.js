import { addMonths, format } from 'date-fns';
import { base44 } from '@/api/base44Client';
import { money } from '@/data/catalogue';

export const DELIVERY_FEE = 4500;
export const FREE_DELIVERY_THRESHOLD = 200000;

export const STATUS_ORDER = [
  'awaiting_payment',
  'payment_confirmed',
  'quality_test',
  'dispatched',
  'delivered',
];

export const STATUS_META = {
  awaiting_payment: { label: 'Awaiting payment', tone: 'bg-amber-100 text-amber-800' },
  payment_confirmed: { label: 'Payment confirmed', tone: 'bg-emerald-100 text-emerald-800' },
  quality_test: { label: 'Quality testing', tone: 'bg-sky-100 text-sky-800' },
  dispatched: { label: 'Out for delivery', tone: 'bg-orange-100 text-orange-800' },
  delivered: { label: 'Delivered', tone: 'bg-emerald-100 text-emerald-800' },
};

export const PAYMENT_META = {
  paid: { label: 'Paid', tone: 'bg-emerald-100 text-emerald-800' },
  due: { label: 'Due now', tone: 'bg-orange-100 text-orange-800' },
  upcoming: { label: 'Upcoming', tone: 'bg-slate-100 text-slate-700' },
};

export const statusLabel = (status) => STATUS_META[status]?.label || 'Processing';
export const statusTone = (status) => STATUS_META[status]?.tone || 'bg-slate-100 text-slate-700';

export const newOrderNumber = () =>
  `VVM-${Math.floor(100000 + Math.random() * 899999)}`;

export function buildSchedule(items, deliveryFee) {
  const installmentItems = items.filter((item) => item.months > 0);
  const monthsCount = installmentItems.length
    ? Math.max(...installmentItems.map((item) => item.months))
    : 1;

  const rows = [];
  for (let month = 1; month <= monthsCount; month += 1) {
    let amount = 0;
    items.forEach((item) => {
      const gross = item.price * item.quantity;
      if (!item.months) {
        if (month === 1) amount += gross;
        return;
      }
      const base = Math.floor(gross / item.months);
      const remainder = gross - base * item.months;
      if (month <= item.months) amount += base + (month === 1 ? remainder : 0);
    });
    if (month === 1) amount += deliveryFee || 0;

    rows.push({
      index: month,
      label:
        monthsCount === 1 && !installmentItems.length
          ? 'Full payment'
          : `Payment ${month} of ${monthsCount}`,
      amount,
      due_date: format(addMonths(new Date(), month - 1), 'yyyy-MM-dd'),
      status: month === 1 ? 'due' : 'upcoming',
      paid_date: '',
      method: '',
      reference: '',
    });
  }
  return rows;
}

export function buildOrderDraft(items) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery_fee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const schedule = buildSchedule(items, delivery_fee);
  const hasInstallment = items.some((item) => item.months > 0);

  return {
    subtotal,
    delivery_fee,
    total: subtotal + delivery_fee,
    schedule,
    payments_count: schedule.length,
    payment_type: hasInstallment ? 'installment' : 'full',
    first_payment: schedule[0]?.amount || 0,
    monthly_amount: schedule.length > 1 ? schedule[1].amount : 0,
  };
}

export async function placeOrder({ items, form, me }) {
  const draft = buildOrderDraft(items);
  const order_number = newOrderNumber();

  const order = await base44.entities.Order.create({
    order_number,
    customer_name: form.full_name,
    customer_email: me.email,
    customer_phone: form.phone,
    delivery_address: form.address,
    city: form.city,
    state: form.state,
    items: items.map((item) => ({
      product_id: item.product_id,
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      quantity: item.quantity,
      months: item.months || 0,
      monthly_amount: item.months ? Math.round(item.price / item.months) : item.price,
    })),
    payment_type: draft.payment_type,
    subtotal: draft.subtotal,
    delivery_fee: draft.delivery_fee,
    total: draft.total,
    amount_paid: 0,
    balance: draft.total,
    status: 'awaiting_payment',
    payments_count: draft.payments_count,
    next_due_date: draft.schedule[0]?.due_date || '',
    schedule: draft.schedule,
    status_history: [
      {
        title: 'Order placed',
        note:
          draft.payment_type === 'installment'
            ? `Installment plan · ${draft.payments_count} payments`
            : 'Full payment selected',
        at: new Date().toISOString(),
      },
    ],
    testing_video_url: '',
    testing_notes: [],
  });

  return order;
}

// Store-side action: record a received payment and refresh the order ledger.
export async function recordPayment(order, index, { method, reference }) {
  const schedule = order.schedule.map((row) =>
    row.index === index
      ? {
          ...row,
          status: 'paid',
          paid_date: format(new Date(), 'yyyy-MM-dd'),
          method: method || 'Bank transfer',
          reference: reference || '',
        }
      : { ...row }
  );

  const nextUnpaid = schedule.find((row) => row.status !== 'paid');
  if (nextUnpaid && nextUnpaid.status === 'upcoming') nextUnpaid.status = 'due';

  const paidRow = schedule.find((row) => row.index === index);
  const amount_paid = schedule
    .filter((row) => row.status === 'paid')
    .reduce((sum, row) => sum + row.amount, 0);
  const balance = Math.max(0, order.total - amount_paid);

  const status_history = [
    ...(order.status_history || []),
    {
      title: `${paidRow.label} received`,
      note: `${money(paidRow.amount)} · ${method || 'Bank transfer'}`,
      at: new Date().toISOString(),
    },
  ];

  return base44.entities.Order.update(order.id, {
    schedule,
    amount_paid,
    balance,
    next_due_date: nextUnpaid ? nextUnpaid.due_date : '',
    status: order.status === 'awaiting_payment' ? 'payment_confirmed' : order.status,
    status_history,
  });
}

// Store-side action: move the order along its fulfilment journey.
export async function advanceStatus(order, status, note) {
  const status_history = [
    ...(order.status_history || []),
    { title: STATUS_META[status]?.label || status, note: note || '', at: new Date().toISOString() },
  ];
  return base44.entities.Order.update(order.id, { status, status_history });
}

export async function saveTracking(order, tracking) {
  return base44.entities.Order.update(order.id, { ...tracking });
}

export async function saveTesting(order, { testing_video_url, testing_notes }) {
  return base44.entities.Order.update(order.id, { testing_video_url, testing_notes });
}
