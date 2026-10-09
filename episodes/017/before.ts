// Folge 017 – Vorher: Big Ball of Mud. Keine Grenzen: jeder greift auf die Daten aller zu.
// Entsteht nicht durch eine schlechte Entscheidung, sondern durch viele kleine Abkürzungen.
export const db = {
  stock: new Map<string, number>([['BOOK', 2]]),
  orders: [] as { id: string; sku: string }[],
  customers: new Map<string, { email: string; vip: boolean }>([['c1', { email: 'max@shop.de', vip: false }]]),
};

export function placeOrder(customerId: string, sku: string): string {
  const left = db.stock.get(sku) ?? 0;                   // Bestellungen fassen das Lager direkt an
  if (left <= 0) throw new Error('Ausverkauft');
  db.stock.set(sku, left - 1);
  const id = `A-${db.orders.length + 1}`;
  db.orders.push({ id, sku });
  const c = db.customers.get(customerId)!;               // … und die Kundendaten
  if (db.orders.length > 1) c.vip = true;                // … und ändern sie nebenbei
  return id;
}
