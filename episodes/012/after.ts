// Folge 012 – Nachher: Observer. placeOrder meldet nur „Bestellung eingegangen“.
// Wer reagieren will, meldet sich an – und kann sich wieder abmelden.
export interface Order { id: string; email: string; sku: string }
type Listener = (order: Order) => void;

export class OrderEvents {
  private readonly listeners = new Set<Listener>();
  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);  // Abmelden nicht vergessen
  }
  publish(order: Order) { this.listeners.forEach(l => l(order)); }
}

export function placeOrder(order: Order, events: OrderEvents): void {
  // … Bestellung speichern …
  events.publish(order);
}
