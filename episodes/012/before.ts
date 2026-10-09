// Folge 012 – Vorher: placeOrder kennt alle, die etwas mit der Bestellung tun wollen.
// Jede neue Reaktion (z. B. Bonuspunkte) = Änderung an placeOrder.
export interface Order { id: string; email: string; sku: string }
export interface Effects { mails: string[]; reserved: string[]; tracked: string[] }

export function placeOrder(order: Order, fx: Effects): void {
  // … Bestellung speichern …
  fx.mails.push(`Danke für Bestellung ${order.id}`);   // Mailer
  fx.reserved.push(order.sku);                          // Lager
  fx.tracked.push(`order_placed:${order.id}`);          // Analytics
}
