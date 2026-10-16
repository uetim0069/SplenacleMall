export const CATEGORIES = [
  'Electronics',
  'Phones & Accessories',
  'Computers',
  'Fashion',
  'Shoes',
  'Bags',
  'Home Appliances',
  'Furniture',
  'Beauty & Health',
  'Groceries',
  'Vehicles',
];

// Seed catalogue — also used to populate the product database on first run.
export const PRODUCTS = [
  {
    name: 'Samsung 55" Crystal UHD 4K Smart TV',
    brand: 'Samsung',
    category: 'Electronics',
    price: 850000,
    old_price: 1000000,
    min_months: 3,
    max_months: 3,
    rating: 4.8,
    reviews_count: 214,
    stock: 18,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/bf7690ec4_generated_1e7bdbb0.png',
    description:
      'A 55-inch Crystal UHD panel with 4K clarity, HDR10+ and built-in streaming apps. Ideal for the family living room, with a slim bezel and vivid colour out of the box.',
    specs: [
      { label: 'Screen size', value: '55 inches' },
      { label: 'Resolution', value: '4K UHD (3840 x 2160)' },
      { label: 'Smart platform', value: 'Tizen OS' },
      { label: 'Connectivity', value: '3 x HDMI, 2 x USB, Wi-Fi, Bluetooth' },
      { label: 'Warranty', value: '24 months' },
    ],
    testing_notes: [
      'Full white, black and colour test patterns to rule out dead pixels',
      'Backlight bleed and uniformity check on a dark room test',
      'All HDMI ports and Wi-Fi streaming verified',
    ],
  },
  {
    name: 'HP Pavilion 15.6" Core i7 Laptop',
    brand: 'HP',
    category: 'Computers',
    price: 780000,
    old_price: 890000,
    min_months: 3,
    max_months: 6,
    rating: 4.6,
    reviews_count: 132,
    stock: 22,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/b61b872be_generated_7a9eb38a.png',
    description:
      'A dependable everyday laptop with a 12th-gen Core i7 processor, 16GB of RAM and a fast SSD. Built for work, school runs and everything in between.',
    specs: [
      { label: 'Processor', value: 'Intel Core i7 (12th Gen)' },
      { label: 'Memory', value: '16GB DDR4' },
      { label: 'Storage', value: '512GB NVMe SSD' },
      { label: 'Display', value: '15.6" Full HD IPS' },
      { label: 'Warranty', value: '12 months' },
    ],
    testing_notes: [
      'Battery health and full charge cycle report',
      'Keyboard, trackpad and every port tested individually',
      'Fresh OS install and stress test before packing',
    ],
  },
  {
    name: 'Apple iPhone 14 Pro Max 256GB',
    brand: 'Apple',
    category: 'Phones & Accessories',
    price: 1650000,
    old_price: 1850000,
    min_months: 3,
    max_months: 6,
    rating: 4.9,
    reviews_count: 486,
    stock: 14,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/02ba1ccd3_generated_27f3f262.png',
    description:
      'The full flagship experience: 6.7-inch Super Retina XDR display, triple camera system and all-day battery. Sealed and network unlocked.',
    specs: [
      { label: 'Display', value: '6.7" Super Retina XDR' },
      { label: 'Storage', value: '256GB' },
      { label: 'Camera', value: '48MP Pro triple system' },
      { label: 'Battery health', value: 'Verified 100%' },
      { label: 'Warranty', value: '12 months' },
    ],
    testing_notes: [
      'IMEI and activation lock status verified in front of the camera',
      'Full camera, speaker, microphone and Face ID test',
      'Battery health reading shown on screen in the test footage',
    ],
  },
  {
    name: 'Milano 5-Seater Luxury Sofa',
    brand: 'Milano',
    category: 'Furniture',
    price: 620000,
    old_price: 670000,
    min_months: 3,
    max_months: 8,
    rating: 4.7,
    reviews_count: 88,
    stock: 9,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/da6327bb3_generated_04e8ad4f.png',
    description:
      'A generously proportioned five-seater in premium upholstery, with high-density foam and a solid hardwood frame. Delivered assembled, ready for the living room.',
    specs: [
      { label: 'Seating', value: '5 seater' },
      { label: 'Upholstery', value: 'Premium woven fabric' },
      { label: 'Frame', value: 'Kiln-dried hardwood' },
      { label: 'Dimensions', value: '290cm x 95cm x 85cm' },
      { label: 'Warranty', value: '24 months' },
    ],
    testing_notes: [
      'Frame and joint inspection under load',
      'Fabric tension and seam check on all cushions',
      'Full set photographed and measured before dispatch',
    ],
  },
  {
    name: 'LG 10.5kg Front-Load Washing Machine',
    brand: 'LG',
    category: 'Home Appliances',
    price: 460000,
    old_price: 520000,
    min_months: 3,
    max_months: 8,
    rating: 4.7,
    reviews_count: 96,
    stock: 12,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/a25e63a40_generated_6fc232fc.png',
    description:
      'A 10.5kg front loader with inverter direct drive, steam refresh and a quiet cycle. Large enough for a full family wash load.',
    specs: [
      { label: 'Capacity', value: '10.5kg' },
      { label: 'Motor', value: 'Inverter Direct Drive' },
      { label: 'Spin speed', value: '1400 rpm' },
      { label: 'Programmes', value: '14 wash programmes' },
      { label: 'Warranty', value: '24 months' },
    ],
    testing_notes: [
      'Full wash and spin cycle run on camera',
      'Water inlet, drain and door seal leak check',
      'Drum balance and noise reading recorded',
    ],
  },
  {
    name: 'Toyota Corolla 2019 (Foreign Used)',
    brand: 'Toyota',
    category: 'Vehicles',
    price: 18500000,
    old_price: 19500000,
    min_months: 12,
    max_months: 24,
    rating: 4.8,
    reviews_count: 41,
    stock: 4,
    featured: true,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/41ffe6901_generated_d971af8f.png',
    description:
      'A clean foreign-used Corolla with verified mileage, full service history and accident-free panels. The classic 24-month plan, built for a vehicle you keep.',
    specs: [
      { label: 'Year', value: '2019' },
      { label: 'Mileage', value: '68,400 km verified' },
      { label: 'Transmission', value: 'Automatic' },
      { label: 'Engine', value: '1.8L 4-cylinder' },
      { label: 'Papers', value: 'Full customs and registration' },
    ],
    testing_notes: [
      'Full computer diagnostics scan on camera',
      'Engine, gearbox and suspension road test',
      'Panel thickness and paint depth readings recorded',
    ],
  },
  {
    name: 'Apple MacBook Air M2 13"',
    brand: 'Apple',
    category: 'Computers',
    price: 1450000,
    old_price: 1580000,
    min_months: 3,
    max_months: 9,
    rating: 4.9,
    reviews_count: 173,
    stock: 11,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/e28a1e2ab_generated_c015bbca.png',
    description:
      'Feather-light, silent and fast. The M2 chip handles design work, school projects and long days away from a charger.',
    specs: [
      { label: 'Chip', value: 'Apple M2' },
      { label: 'Memory', value: '8GB unified' },
      { label: 'Storage', value: '256GB SSD' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Warranty', value: '12 months' },
    ],
    testing_notes: [
      'Cycle count and battery condition verified',
      'Display uniformity and keyboard test',
      'Every port and the MagSafe charger tested',
    ],
  },
  {
    name: 'Nike Air Max Running Sneakers',
    brand: 'Nike',
    category: 'Shoes',
    price: 145000,
    old_price: 168000,
    min_months: 3,
    max_months: 3,
    rating: 4.6,
    reviews_count: 210,
    stock: 40,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/472786715_generated_d9135c98.png',
    description:
      'Cushioned Air Max sole with a breathable mesh upper. Available in a full run of sizes, verified authentic before dispatch.',
    specs: [
      { label: 'Sizes', value: 'UK 6 – 12' },
      { label: 'Upper', value: 'Breathable engineered mesh' },
      { label: 'Sole', value: 'Air Max cushioning' },
      { label: 'Authenticity', value: 'Verified' },
      { label: 'Returns', value: 'Exchanges within 7 days' },
    ],
    testing_notes: [
      'Stitching, sole bond and size tag inspection',
      'Authenticity hologram check on camera',
      'Both shoes photographed from every angle',
    ],
  },
  {
    name: 'Hisense 419L Double-Door Refrigerator',
    brand: 'Hisense',
    category: 'Home Appliances',
    price: 540000,
    old_price: 595000,
    min_months: 3,
    max_months: 8,
    rating: 4.5,
    reviews_count: 74,
    stock: 15,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/c2c06d836_generated_da4d8a55.png',
    description:
      'A 419-litre frost-free double-door fridge with a dedicated vegetable crisper and fast-freeze compartment. Runs quietly and holds temperature evenly.',
    specs: [
      { label: 'Capacity', value: '419 litres' },
      { label: 'Defrost', value: 'Frost free' },
      { label: 'Energy', value: 'A+ rated' },
      { label: 'Dimensions', value: '172cm x 70cm x 66cm' },
      { label: 'Warranty', value: '24 months' },
    ],
    testing_notes: [
      'Temperature pull-down test logged over 4 hours',
      'Door seal, shelving and crisper inspection',
      'Cooling performance report photographed',
    ],
  },
  {
    name: 'Milano Structured Leather Handbag',
    brand: 'Milano',
    category: 'Bags',
    price: 180000,
    old_price: 210000,
    min_months: 3,
    max_months: 6,
    rating: 4.7,
    reviews_count: 119,
    stock: 26,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/bd33cbc17_generated_78e882b7.png',
    description:
      'A structured everyday bag in genuine leather with brushed hardware and a lined interior. Holds a laptop, a tablet and the essentials.',
    specs: [
      { label: 'Material', value: 'Genuine leather' },
      { label: 'Hardware', value: 'Brushed gold-tone' },
      { label: 'Interior', value: 'Lined, 3 compartments' },
      { label: 'Closure', value: 'Zip top' },
      { label: 'Warranty', value: '6 months on hardware' },
    ],
    testing_notes: [
      'Leather grain and stitching inspection',
      'Zip and hardware function test',
      'Full set photographed before packing',
    ],
  },
  {
    name: 'Hyundai Elantra 2020 (Foreign Used)',
    brand: 'Hyundai',
    category: 'Vehicles',
    price: 14200000,
    old_price: 15400000,
    min_months: 12,
    max_months: 24,
    rating: 4.6,
    reviews_count: 28,
    stock: 3,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/9e34a0e2a_generated_2f23949a.png',
    description:
      'A sharp foreign-used Elantra with strong fuel economy and a clean interior. Verified mileage and full diagnostic report before handover.',
    specs: [
      { label: 'Year', value: '2020' },
      { label: 'Mileage', value: '54,900 km verified' },
      { label: 'Transmission', value: 'Automatic' },
      { label: 'Engine', value: '2.0L 4-cylinder' },
      { label: 'Papers', value: 'Full customs and registration' },
    ],
    testing_notes: [
      'Full diagnostics scan recorded on camera',
      'Brake, tyre and suspension inspection',
      'Interior detail and electrical test',
    ],
  },
  {
    name: 'JBL Party Speaker 1000W',
    brand: 'JBL',
    category: 'Electronics',
    price: 310000,
    old_price: 355000,
    min_months: 3,
    max_months: 6,
    rating: 4.7,
    reviews_count: 154,
    stock: 20,
    featured: false,
    image_url: 'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/d1f359d85_generated_fef38307.png',
    description:
      '1000 watts of room-filling sound with a light show, wheels and a rechargeable battery. Built for parties that move.',
    specs: [
      { label: 'Output', value: '1000W peak' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Inputs', value: 'Bluetooth, USB, XLR mic, guitar' },
      { label: 'Extras', value: 'Wheels and pull handle' },
      { label: 'Warranty', value: '12 months' },
    ],
    testing_notes: [
      'Full volume and distortion test on camera',
      'Every input, mic channel and light mode tested',
      'Battery charge cycle verified',
    ],
  },
];

export const SHOWROOM_IMAGE =
  'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/d98bff09c_generated_1a0ea4df.png';
export const LAB_IMAGE =
  'https://media.base44.com/images/public/6ad1ccbe6503cfbecb151bf3/d6eae4744_generated_5e70756e.png';

export const money = (value) =>
  `₦${Number(value || 0).toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;

export const monthlyFor = (price, months) =>
  months > 0 ? Math.round(Number(price) / Number(months)) : Number(price);

export const planLabel = (months) =>
  months > 0 ? `${months} month${months > 1 ? 's' : ''}` : 'Full payment';

export const discountPercent = (price, oldPrice) =>
  oldPrice && oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

// Terms section 5 — installment rules: tenures of 3, 6, 12, 18 or 24 months (5.3),
// a ₦50,000 minimum order (5.1) and at most two items per installment cart (5.4).
export const INSTALLMENT_TENURES = [3, 6, 12, 18, 24];
export const INSTALLMENT_MIN_ORDER = 50000;
export const MAX_INSTALLMENT_ITEMS = 2;

// The tenures an item may be paid over, held inside the legal 3–24 month window.
export const planMonths = (product) => {
  if (!product || Number(product.price) < INSTALLMENT_MIN_ORDER) return [];
  const min = Math.max(3, Number(product.min_months) || 3);
  const max = Math.min(24, Math.max(Number(product.max_months) || min, min));
  return INSTALLMENT_TENURES.filter((months) => months >= min && months <= max);
};
