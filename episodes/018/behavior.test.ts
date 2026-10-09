import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('018 gleiches fachliches Ergebnis', () => {
  it('before: funktioniert – solange alle Dienste erreichbar sind', () => {
    const calls: string[] = [];
    const http: before.Http = url => { calls.push(url); return { ok: true, data: { id: 'A-1' } }; };
    expect(before.placeOrder(http, 'BOOK', 'max@shop.de')).toBe('A-1');
    expect(calls).toHaveLength(3);
  });
  it('before: Teilausfall', () => {
    const http: before.Http = url => ({ ok: !url.includes('order-service') });
    expect(() => before.placeOrder(http, 'BOOK', 'max@shop.de')).toThrow('Reservierung hängt');
  });
  it('after: Module im selben Prozess', () => {
    const mails: string[] = [];
    const orders = after.ordersModule({ inventory: after.inventoryModule({ BOOK: 1 }),
      notifications: { orderPlaced: (e, id) => mails.push(`${e}:${id}`) } });
    expect(orders.placeOrder('BOOK', 'max@shop.de')).toBe('A-1');
    expect(mails).toEqual(['max@shop.de:A-1']);
    expect(() => orders.placeOrder('BOOK', 'max@shop.de')).toThrow('Ausverkauft');
  });
});
