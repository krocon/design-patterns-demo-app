// Folge 016 – Nachher: zusammengehöriges Wissen an EINER Stelle – Value Object Money.
// Neue Währung = eine Änderung in Money, nicht zehn.
export class Money {
  private constructor(readonly cents: number, readonly currency: 'EUR' | 'CHF') {}
  static of(amount: number, currency: 'EUR' | 'CHF' = 'EUR') { return new Money(Math.round(amount * 100), currency); }
  times(factor: number) { return new Money(Math.round(this.cents * factor), this.currency); }
  format(): string {
    const value = (this.cents / 100).toFixed(2).replace('.', ',');
    return this.currency === 'EUR' ? `${value} €` : `CHF ${value}`;
  }
}

export const cartLine = (name: string, price: number) => `${name}: ${Money.of(price).format()}`;
export const invoiceTotal = (net: number) => `Gesamt: ${Money.of(net).times(1.19).format()}`;
export const mailSubject = (orderId: string, amount: number) => `Bestellung ${orderId} über ${Money.of(amount).format()}`;
