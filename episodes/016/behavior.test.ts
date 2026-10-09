import { describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe.each([['before', before], ['after', after]] as const)('016 Geldbeträge (%s)', (_, m) => {
  it('Warenkorbzeile', () => expect(m.cartLine('Buch', 12.5)).toBe('Buch: 12,50 €'));
  it('Rechnung brutto', () => expect(m.invoiceTotal(100)).toBe('Gesamt: 119,00 €'));
  it('Mail-Betreff', () => expect(m.mailSubject('A-1', 7)).toBe('Bestellung A-1 über 7,00 €'));
});

describe('016 neue Währung an einer Stelle', () => {
  it('CHF', () => expect(after.Money.of(9.5, 'CHF').format()).toBe('CHF 9,50'));
});
