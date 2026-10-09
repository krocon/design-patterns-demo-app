import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('017 gleiches Verhalten beim Bestellen', () => {
  it('before', () => {
    expect(before.placeOrder('c1', 'BOOK')).toBe('A-1');
    expect(before.placeOrder('c1', 'BOOK')).toBe('A-2');
    expect(() => before.placeOrder('c1', 'BOOK')).toThrow('Ausverkauft');
    expect(before.db.customers.get('c1')!.vip).toBe(true);   // Nebenwirkung, die keiner erwartet
  });
  it('after', () => {
    const inventory = after.createInventory({ BOOK: 2 });
    const orders = after.createOrders(inventory);
    expect(orders.place('BOOK')).toBe('A-1');
    expect(orders.place('BOOK')).toBe('A-2');
    expect(() => orders.place('BOOK')).toThrow('Ausverkauft');
    expect(inventory.available('BOOK')).toBe(0);
  });
});
