import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

type Shop = { add(s: string, p: number): void; total(): number; checkout(e: string): string; report(): string; mails(): string[] };
const variants: [string, () => Shop][] = [
  ['before', () => { const m = new before.ShopManager();
    return { add: (s, p) => m.addToCart(s, p), total: () => m.cartTotal(), checkout: e => m.checkout(e), report: () => m.revenueReport(), mails: () => m.mails }; }],
  ['after', () => { const cart = new after.Cart(); const orders = new after.OrderBook(); const mailer = new after.Mailer();
    const co = new after.Checkout(cart, orders, mailer);
    return { add: (s, p) => cart.add(s, p), total: () => cart.total(), checkout: e => co.run(e), report: () => after.revenueReport(orders), mails: () => mailer.sent }; }],
];

describe.each(variants)('015 Shop (%s)', (_, setup) => {
  it('Warenkorb → Bestellung → Mail → Report', () => {
    const shop = setup();
    shop.add('BOOK', 12.5); shop.add('PEN', 2.5);
    expect(shop.total()).toBe(15);
    expect(shop.checkout('max@shop.de')).toBe('A-1');
    expect(shop.total()).toBe(0);
    expect(shop.mails()).toEqual(['max@shop.de: Danke für A-1']);
    shop.add('BAG', 30); shop.checkout('eva@shop.de');
    expect(shop.report()).toBe('Umsatz: 45.00');
  });
});
