// Folge 008 – Vorher: Objekterzeugung über den Code verstreut.
// Neue Zahlart oder geänderter Konstruktor = jede Stelle suchen und anpassen.
export interface Payment { charge(amount: number): string; refund(amount: number): string }

export class CardPayment implements Payment {
  constructor(private readonly apiKey: string) {}
  charge(a: number) { return `card(${this.apiKey}):charge:${a}`; }
  refund(a: number) { return `card(${this.apiKey}):refund:${a}`; }
}
export class PaypalPayment implements Payment {
  constructor(private readonly clientId: string, private readonly sandbox: boolean) {}
  charge(a: number) { return `paypal(${this.clientId},${this.sandbox}):charge:${a}`; }
  refund(a: number) { return `paypal(${this.clientId},${this.sandbox}):refund:${a}`; }
}

export function checkout(method: string, amount: number): string {
  const payment = method === 'card' ? new CardPayment('sk_demo') : new PaypalPayment('shop-client', false);
  return payment.charge(amount);
}

export function refund(method: string, amount: number): string {
  const payment = method === 'card' ? new CardPayment('sk_demo') : new PaypalPayment('shop-client', false);
  return payment.refund(amount);
}
