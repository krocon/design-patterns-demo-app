// Folge 015 – Vorher: God Object. Warenkorb, Bezahlung, Mails, Reports – alles in einer Klasse.
// In echten Projekten: 3000 Zeilen, jede Änderung landet hier, Merge-Konflikte garantiert.
export class ShopManager {
  private cart: { sku: string; price: number }[] = [];
  private orders: { id: string; total: number }[] = [];
  readonly mails: string[] = [];

  addToCart(sku: string, price: number) { this.cart.push({ sku, price }); }
  cartTotal() { return this.cart.reduce((s, i) => s + i.price, 0); }
  checkout(email: string): string {
    const id = `A-${this.orders.length + 1}`;
    this.orders.push({ id, total: this.cartTotal() });
    this.cart = [];
    this.mails.push(`${email}: Danke für ${id}`);
    return id;
  }
  revenueReport() { return `Umsatz: ${this.orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`; }
  // … plus Lager, Gutscheine, Retouren, Export, Admin-Funktionen …
}
