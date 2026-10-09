import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

const DAY = 24 * 60 * 60 * 1000;
const now = Date.UTC(2026, 9, 9);
const customer = (email: string, daysAgo: number, active = true, deleted = false) =>
  ({ email, active, deleted, lastLogin: now - daysAgo * DAY });

describe.each([['before', before.newsletterRecipients], ['after', after.newsletterRecipients]])('003 newsletterRecipients (%s)', (_, fn) => {
  it('nur aktive, nicht gelöschte, kürzlich eingeloggte – sortiert', () => {
    const list = [customer('zoe@shop.de', 1), customer('anna@shop.de', 29), customer('old@shop.de', 31),
      customer('off@shop.de', 2, false), customer('gone@shop.de', 2, true, true)];
    expect(fn(list, now)).toEqual(['anna@shop.de', 'zoe@shop.de']);
  });
  it('leere Liste', () => expect(fn([], now)).toEqual([]));
});
