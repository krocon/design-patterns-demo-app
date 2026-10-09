import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before.vat], ['after', after.vat]])('020 vat (%s) – unverändert für DE', (_, vat) => {
  it('DE 19 %', () => expect(vat(100, 'DE')).toBe(19));
});

describe('020 die versteckten Zinsen', () => {
  it('before: Österreich wird still falsch berechnet', () => expect(before.vat(100, 'AT')).toBe(19));
  it('after: Österreich richtig', () => expect(after.vat(100, 'AT')).toBe(20));
  it('after: Unbekanntes wird sichtbar', () => expect(() => after.vat(100, 'CH')).toThrow('SHOP-142'));
});
