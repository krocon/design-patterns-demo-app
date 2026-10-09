// Folge 015 – Nachher: Schritt für Schritt per Extract Class zerlegt – entlang fachlicher Verantwortungen.
export class Cart {
  private items: { sku: string; price: number }[] = [];
  add(sku: string, price: number) { this.items.push({ sku, price }); }
  total() { return this.items.reduce((s, i) => s + i.price, 0); }
  clear() { this.items = []; }
}

export class OrderBook {
  private readonly orders: { id: string; total: number }[] = [];
  record(total: number) { const id = `A-${this.orders.length + 1}`; this.orders.push({ id, total }); return id; }
  revenue() { return this.orders.reduce((s, o) => s + o.total, 0); }
}

export class Mailer {
  readonly sent: string[] = [];
  thankYou(email: string, orderId: string) { this.sent.push(`${email}: Danke für ${orderId}`); }
}

export class Checkout {
  constructor(private readonly cart: Cart, private readonly orders: OrderBook, private readonly mailer: Mailer) {}
  run(email: string): string {
    const id = this.orders.record(this.cart.total());
    this.cart.clear();
    this.mailer.thankYou(email, id);
    return id;
  }
}

export const revenueReport = (orders: OrderBook) => `Umsatz: ${orders.revenue().toFixed(2)}`;
