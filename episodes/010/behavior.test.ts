import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

const sdk = new before.LegacyPaySdk();
describe.each([
  ['before', (a: number) => before.checkout(sdk, a)],
  ['after', (a: number) => after.checkout(new after.LegacyPayAdapter(sdk), a)],
])('010 checkout (%s)', (_, checkout) => {
  it('zahlt in Cent', () => expect(checkout(19.99)).toBe('LP-978-1999'));
  it('Fehler wird übersetzt', () => expect(() => checkout(0)).toThrow('Zahlung abgelehnt (402)'));
});

describe('010 Test-Double ohne SDK', () => {
  it('Fake-Gateway', () => expect(after.checkout({ pay: () => 'FAKE' }, 1)).toBe('FAKE'));
});
