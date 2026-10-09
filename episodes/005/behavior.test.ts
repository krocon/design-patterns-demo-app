import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before.pay], ['after', after.pay]])('005 pay (%s)', (_, pay) => {
  it('rechnet in Cent', () => expect(pay(19.99)).toBe('card:1999'));
  it('rundet', () => expect(pay(0.105)).toBe('card:11'));
});
