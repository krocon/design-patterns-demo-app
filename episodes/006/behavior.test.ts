import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

type Setup = () => { place: (o: before.Order) => number; saved: () => unknown[]; mails: () => string[] };
const variants: [string, Setup][] = [
  ['before', () => { const s = new before.OrderService();
    return { place: o => s.placeOrder(o), saved: () => s.saved, mails: () => s.sentMails }; }],
  ['after', () => { const saved: after.Order[] = []; const mails: string[] = [];
    const s = new after.OrderService({ standard: after.standard, express: after.express },
      { save: o => saved.push(o) }, { orderPlaced: o => mails.push(`${o.email}: Bestellung ${o.id}`) });
    return { place: o => s.placeOrder(o), saved: () => saved, mails: () => mails }; }],
];

describe.each(variants)('006 OrderService (%s)', (_, setup) => {
  it('Standardversand, speichert und benachrichtigt', () => {
    const s = setup();
    expect(s.place({ id: 'A-1', weightKg: 2, shipping: 'standard', email: 'max@shop.de' })).toBe(4.99);
    expect(s.saved()).toHaveLength(1);
    expect(s.mails()).toEqual(['max@shop.de: Bestellung A-1']);
  });
  it('Express hängt vom Gewicht ab', () => {
    expect(setup().place({ id: 'A-2', weightKg: 3, shipping: 'express', email: 'max@shop.de' })).toBeCloseTo(12.99);
  });
});

describe('006 Liskov: jede ShippingRate hält den Vertrag (Kosten >= 0)', () => {
  it.each([['standard', after.standard], ['express', after.express]])('%s', (_, rate) =>
    expect(rate.cost({ id: 'x', weightKg: 0, shipping: 'x', email: '' })).toBeGreaterThanOrEqual(0));
});
