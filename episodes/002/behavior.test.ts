import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

type Args = { items: { price: number; qty: number }[]; country: string; coupon: '' | 'SAVE10'; express: boolean };
const c = { name: 'Max Muster', street: 'Hafenstraße 1', zip: '20457', city: 'Hamburg' };

const variants: [string, (a: Args) => { total: number; shipping: number; label: string }][] = [
  ['before', a => before.invoice('R-1', a.items, { ...c, country: a.country }, a.coupon, a.express)],
  ['after', a => after.createInvoice({ id: 'R-1', items: a.items, coupon: a.coupon, express: a.express,
    customer: new after.Customer(c.name, c.street, c.zip, c.city, a.country) })],
];

describe.each(variants)('002 invoice (%s)', (_, run) => {
  it('DE unter 50 €', () => expect(run({ items: [{ price: 20, qty: 2 }], country: 'DE', coupon: '', express: false }).total).toBe(44.99));
  it('DE mit Gutschein und Express', () => {
    const r = run({ items: [{ price: 60, qty: 1 }], country: 'DE', coupon: 'SAVE10', express: true });
    expect(r.total).toBe(63.99);
    expect(r.shipping).toBeCloseTo(9.99);
  });
  it('Ausland unter 100 €', () => expect(run({ items: [{ price: 80, qty: 1 }], country: 'AT', coupon: '', express: false }).total).toBe(94.99));
  it('Ausland Express über 100 €', () => expect(run({ items: [{ price: 120, qty: 1 }], country: 'AT', coupon: '', express: true }).total).toBe(139.99));
  it('Adressetikett', () => expect(run({ items: [], country: 'DE', coupon: '', express: false }).label)
    .toBe('Max Muster\nHafenstraße 1\n20457 Hamburg\nDE'));
});
