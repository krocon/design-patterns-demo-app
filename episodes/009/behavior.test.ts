import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('009 Builder erzeugt dieselbe Bestellung', () => {
  it('sampleOrder: before und after identisch', () => expect(after.sampleOrder()).toEqual(before.sampleOrder()));
  it('validiert in build()', () => expect(() => new after.OrderBuilder('A-2', 'Eva').build()).toThrow('Bestellung ohne Artikel'));
  it('Standardwerte', () => {
    const o = new after.OrderBuilder('A-3', 'Eva').withItem('PEN').build();
    expect(o).toMatchObject({ giftWrap: false, express: false, note: null, currency: 'EUR', items: [{ sku: 'PEN', qty: 1 }] });
  });
});
