import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('019 Strangler-Fassade', () => {
  const shop = after.stranglerFacade();
  it('umgezogene Routen laufen über neuen Code', () => {
    expect(shop('/products')).toBe('new:products');
    expect(shop('/cart')).toBe('new:cart');
  });
  it('alles andere geht unverändert ans Altsystem', () => {
    for (const p of ['/checkout', '/account', '/unknown']) expect(shop(p)).toBe(before.legacyShop(p));
  });
  it('Fortschritt messbar', () => expect(after.migrationProgress()).toBe(2));
});
