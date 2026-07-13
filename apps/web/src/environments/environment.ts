export const environment = {
  apiUrl: window.__NEXASUPPLY_CONFIG__?.apiUrl ?? 'http://localhost:8000'
} as const;
