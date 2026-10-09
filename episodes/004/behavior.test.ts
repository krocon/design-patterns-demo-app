import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

type Api = { email: (v: string) => boolean; zip: (v: string) => boolean; optionalZip: (v: string) => boolean };
const variants: [string, Api][] = [
  ['before', { email: v => before.validate(v, true, false, false), zip: v => before.validate(v, false, true, false),
    optionalZip: v => before.validate(v, false, true, true) }],
  ['after', { email: after.isValidEmail, zip: after.isValidZip, optionalZip: after.optional(after.isValidZip) }],
];

describe.each(variants)('004 Validierung (%s)', (_, api) => {
  it('E-Mail', () => {
    expect(api.email('max@shop.de')).toBe(true);
    expect(api.email('max.shop.de')).toBe(false);
    expect(api.email('')).toBe(false);
  });
  it('PLZ', () => {
    expect(api.zip('20457')).toBe(true);
    expect(api.zip('2045')).toBe(false);
  });
  it('optionale PLZ', () => {
    expect(api.optionalZip('')).toBe(true);
    expect(api.optionalZip('abc')).toBe(false);
  });
});
