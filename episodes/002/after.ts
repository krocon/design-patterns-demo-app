// Folge 002 – Nachher: jeder Smell mit seinem Refactoring behoben.
// Long Parameter List → Introduce Parameter Object · Long Method → Extract Function
// Duplicated Code → eine Tabelle · Feature Envy → Move Function · Primitive Obsession → eigene Typen
export interface Item { price: number; qty: number }
export type Country = 'DE' | (string & {});
export type Coupon = 'SAVE10' | '';

export class Customer {
  constructor(readonly name: string, readonly street: string, readonly zip: string,
              readonly city: string, readonly country: Country) {}
  shippingLabel(): string { return [this.name, this.street, `${this.zip} ${this.city}`, this.country].join('\n'); }
}

export interface InvoiceRequest { id: string; items: Item[]; customer: Customer; coupon: Coupon; express: boolean }

const SHIPPING = {
  domestic: { freeFrom: 50, fee: 4.99, express: 9.99 },
  international: { freeFrom: 100, fee: 14.99, express: 19.99 },
};
const COUPON_DISCOUNT: Record<Coupon, number> = { SAVE10: 0.1, '': 0 };

export function createInvoice(req: InvoiceRequest) {
  const subtotal = applyCoupon(sumItems(req.items), req.coupon);
  const shipping = shippingCost(subtotal, req.customer.country, req.express);
  return { id: req.id, total: roundCents(subtotal + shipping), shipping, label: req.customer.shippingLabel() };
}

const sumItems = (items: Item[]) => items.reduce((sum, i) => sum + i.price * i.qty, 0);
const applyCoupon = (amount: number, coupon: Coupon) => amount * (1 - COUPON_DISCOUNT[coupon]);
const roundCents = (amount: number) => Math.round(amount * 100) / 100;

function shippingCost(subtotal: number, country: Country, express: boolean): number {
  const rate = country === 'DE' ? SHIPPING.domestic : SHIPPING.international;
  const base = subtotal >= rate.freeFrom ? 0 : rate.fee;
  return express ? base + rate.express : base;
}
