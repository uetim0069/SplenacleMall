const isNode = typeof window === 'undefined';
export const appParams = {
  token: isNode ? null : window.localStorage.getItem('base44_access_token'),
};
