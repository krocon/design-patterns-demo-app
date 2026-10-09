import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

const order = { id: 'A-1', email: 'max@shop.de', sku: 'BOOK' };
const expected = { mails: ['Danke für Bestellung A-1'], reserved: ['BOOK'], tracked: ['order_placed:A-1'] };

describe('012 gleiche Reaktionen auf eine Bestellung', () => {
  it('before', () => {
    const fx = { mails: [], reserved: [], tracked: [] } as before.Effects;
    before.placeOrder(order, fx);
    expect(fx).toEqual(expected);
  });
  it('after', () => {
    const fx = { mails: [] as string[], reserved: [] as string[], tracked: [] as string[] };
    const events = new after.OrderEvents();
    events.subscribe(o => fx.mails.push(`Danke für Bestellung ${o.id}`));
    events.subscribe(o => fx.reserved.push(o.sku));
    events.subscribe(o => fx.tracked.push(`order_placed:${o.id}`));
    after.placeOrder(order, events);
    expect(fx).toEqual(expected);
  });
  it('after: abmelden', () => {
    const events = new after.OrderEvents(); const calls: string[] = [];
    const unsubscribe = events.subscribe(o => calls.push(o.id));
    unsubscribe();
    after.placeOrder(order, events);
    expect(calls).toEqual([]);
  });
});
