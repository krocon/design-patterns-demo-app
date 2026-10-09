// Erst Verhalten absichern, dann refactoren: derselbe Test läuft gegen before UND after.
import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before.orderTotal], ['after', after.orderTotal]])('001 orderTotal (%s)', (_, orderTotal) => {
  const order = (...items: [number, number][]) => ({ items: items.map(([price, qty]) => ({ price, qty })) });

  it('kleine Bestellung: Versand 4,99', () => expect(orderTotal(order([10, 2]), false)).toBeCloseTo(24.99));
  it('ab 50 €: versandkostenfrei', () => expect(orderTotal(order([25, 2]), false)).toBeCloseTo(50));
  it('Mitglied: 10 % Rabatt, danach Versandgrenze', () => expect(orderTotal(order([50, 1]), true)).toBeCloseTo(49.99));
  it('Mitglied über der Grenze', () => expect(orderTotal(order([100, 1]), true)).toBeCloseTo(90));
  it('leere Bestellung', () => expect(orderTotal(order(), false)).toBeCloseTo(4.99));
});
