import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before], ['after', after]] as const)('008 Zahlungen (%s)', (_, m) => {
  it('Karte', () => expect(m.checkout('card', 20)).toBe('card(sk_demo):charge:20'));
  it('PayPal', () => expect(m.checkout('paypal', 20)).toBe('paypal(shop-client,false):charge:20'));
  it('Erstattung', () => expect(m.refund('card', 5)).toBe('card(sk_demo):refund:5'));
});
