// Folge 019 – Vorher: das Altsystem. Ein großer Handler für alles – der Big-Bang-Rewrite ist zu riskant.
export type Handler = (path: string) => string;

export const legacyShop: Handler = path => {
  if (path === '/products') return 'legacy:products';
  if (path === '/cart') return 'legacy:cart';
  if (path === '/checkout') return 'legacy:checkout';
  if (path === '/account') return 'legacy:account';
  return 'legacy:404';
};
