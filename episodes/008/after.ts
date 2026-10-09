// Folge 008 – Nachher: Factory. Erzeugung an EINER Stelle, Aufrufer kennen nur das Interface.
import { CardPayment, PaypalPayment, type Payment } from './before';
export type PaymentMethod = 'card' | 'paypal';

export function createPayment(method: PaymentMethod): Payment {
  switch (method) {
    case 'card': return new CardPayment('sk_demo');
    case 'paypal': return new PaypalPayment('shop-client', false);
  }
}

export const checkout = (method: PaymentMethod, amount: number) => createPayment(method).charge(amount);
export const refund = (method: PaymentMethod, amount: number) => createPayment(method).refund(amount);
