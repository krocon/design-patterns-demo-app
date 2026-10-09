// Folge 018 – Vorher: „Wir brauchen Microservices!“ – für ein kleines Team.
// Jeder Aufruf geht übers Netz: Latenz, Teilausfälle, verteilte Transaktionen.
export type Http = (url: string, body: unknown) => { ok: boolean; data?: any };

export function placeOrder(http: Http, sku: string, email: string): string {
  const stock = http('http://inventory-service/reserve', { sku });
  if (!stock.ok) throw new Error('Inventory-Service nicht erreichbar');
  const order = http('http://order-service/orders', { sku });
  if (!order.ok) throw new Error('Order-Service down – Reservierung hängt jetzt fest!');
  http('http://mail-service/send', { email, orderId: order.data.id }); // Fehler? Ignoriert …
  return order.data.id;
}
