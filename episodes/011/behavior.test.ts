import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

const table = { BOOK: 12.5 };
type Counting = { lookups: number };

const variants: [string, () => { svc: { getPrice(s: string): number }; log: string[]; counter: Counting }][] = [
  ['before', () => {
    const counter = { lookups: 0 };
    const prices = new Proxy(table, { get: (t, k) => { counter.lookups++; return (t as any)[k]; } });
    const svc = new before.CachedLoggingPriceService(prices);
    return { svc, log: svc.log, counter };
  }],
  ['after', () => {
    const counter = { lookups: 0 }; const log: string[] = [];
    const base: after.PriceService = { getPrice: s => { counter.lookups++; return new after.TablePriceService(table).getPrice(s); } };
    return { svc: new after.LoggingPriceService(new after.CachingPriceService(base), log), log, counter };
  }],
];

describe.each(variants)('011 PriceService (%s)', (_, setup) => {
  it('liefert Preis, loggt jeden Aufruf, fragt die Quelle nur einmal', () => {
    const { svc, log, counter } = setup();
    expect(svc.getPrice('BOOK')).toBe(12.5);
    expect(svc.getPrice('BOOK')).toBe(12.5);
    expect(log).toEqual(['getPrice(BOOK)', 'getPrice(BOOK)']);
    expect(counter.lookups).toBe(1);
  });
});

describe('011 Decorator frei kombinierbar', () => {
  it('nur Logging, ohne Cache', () => {
    const log: string[] = [];
    expect(new after.LoggingPriceService(new after.TablePriceService(table), log).getPrice('X')).toBe(0);
    expect(log).toEqual(['getPrice(X)']);
  });
});

describe('011 createPriceService', () => {
  it('Logging außen, Cache innen', () => {
    const log: string[] = [];
    const svc = after.createPriceService(table, log);
    expect(svc.getPrice('BOOK')).toBe(12.5);
    expect(log).toEqual(['getPrice(BOOK)']);
  });
});
