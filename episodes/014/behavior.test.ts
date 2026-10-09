import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('014 gleiches Ergebnis', () => {
  it('before', () => expect(before.grossPrice(100)).toBe('119.00 EUR'));
  it('after', () => expect(after.grossPrice(100, after.createConfig())).toBe('119.00 EUR'));
});

describe('014 das eigentliche Problem', () => {
  it('before: ein Test ändert den globalen Zustand – und alle späteren Aufrufe sind betroffen', () => {
    before.Config.getInstance().currency = 'CHF';
    expect(before.grossPrice(100)).toBe('119.00 CHF');
    before.Config.getInstance().currency = 'EUR';   // händisch zurücksetzen …
  });
  it('after: Konfiguration pro Aufruf, unveränderlich', () => {
    const chf = after.createConfig({ currency: 'CHF', vatRate: 0.081 });
    expect(after.grossPrice(100, chf)).toBe('108.10 CHF');
    expect(Object.isFrozen(chf)).toBe(true);
    expect(after.grossPrice(100, after.createConfig())).toBe('119.00 EUR');
  });
});
