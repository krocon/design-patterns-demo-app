// Folge 020 – Nachher: bewusste, dokumentierte Schuld mit Rückzahlplan – und die erste Rate bezahlt.
// Schuld 2026-10: „Nur DE/AT“ (bewusst, für den Launch). Ticket SHOP-142 (Enabler), Grenze: vor Launch CH.
// Unbekanntes Land → klarer Fehler statt stiller Falschberechnung.
const VAT_RATES: Record<string, number> = { DE: 0.19, AT: 0.2 };

export function vat(net: number, country: string): number {
  const rate = VAT_RATES[country];
  if (rate === undefined) throw new Error(`USt für ${country} noch nicht unterstützt (SHOP-142)`);
  return Math.round(net * rate * 100) / 100;
}
