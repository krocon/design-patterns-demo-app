// Folge 001 – Nachher: gleiches Verhalten, bessere Struktur.
// Schritte (jeweils Test grün): Rename → Extract Function → Konstanten statt Magic Numbers.
export interface LineItem { price: number; qty: number }
export interface Order { items: LineItem[] }

const MEMBER_DISCOUNT = 0.1;
const FREE_SHIPPING_FROM = 50;
const SHIPPING_FEE = 4.99;

// Gleicher Test, neue Struktur: Rename + Extract Function
export function orderTotal(order: Order, isMember: boolean): number {
  const subtotal = sumItems(order.items);
  const discounted = isMember ? memberDiscount(subtotal) : subtotal;
  return discounted + shippingFee(discounted);
}

const sumItems = (items: LineItem[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
const memberDiscount = (amount: number) => amount * (1 - MEMBER_DISCOUNT);
const shippingFee = (amount: number) => (amount < FREE_SHIPPING_FROM ? SHIPPING_FEE : 0);
