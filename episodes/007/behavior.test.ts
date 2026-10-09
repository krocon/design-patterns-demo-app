import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before.shippingCost], ['after', after.shippingCost]])('007 shippingCost (%s)', (_, cost) => {
  it('DHL nach Gewicht', () => expect(cost('dhl', 4)).toBeCloseTo(6.99));
  it('UPS gestaffelt', () => { expect(cost('ups', 5)).toBe(9.99); expect(cost('ups', 12)).toBe(19.99); });
  it('Abholung kostenlos', () => expect(cost('pickup', 30)).toBe(0));
  it('unbekannte Versandart', () => expect(() => cost('drone', 1)).toThrow('Unbekannte Versandart: drone'));
});
