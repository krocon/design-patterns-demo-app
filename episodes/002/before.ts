// Folge 002 – Vorher: fünf Code Smells in einer Funktion.
// Long Method · Long Parameter List · Duplicated Code · Feature Envy · Primitive Obsession
export interface Item { price: number; qty: number }
export interface Customer { name: string; street: string; zip: string; city: string; country: string }

export function invoice(id: string, items: Item[], c: Customer, coupon: string, express: boolean) {
  let sum = 0;
  for (const it of items) sum += it.price * it.qty;
  if (coupon === 'SAVE10') sum = sum - sum * 0.1;
  let ship = 0;
  if (c.country === 'DE') ship = sum >= 50 ? 0 : 4.99;
  else ship = sum >= 100 ? 0 : 14.99;
  if (express) { if (c.country === 'DE') ship += 9.99; else ship += 19.99; }
  const label = c.name + '\n' + c.street + '\n' + c.zip + ' ' + c.city + '\n' + c.country;
  const total = Math.round((sum + ship) * 100) / 100;
  return { id, total, shipping: ship, label };
}
