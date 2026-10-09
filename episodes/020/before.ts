// Folge 020 – Vorher: Technische Schuld ohne Plan. Für den Launch „nur DE“ – heimlich, undokumentiert.
// Niemand weiß davon, bis der erste Kunde aus Österreich bestellt.
export function vat(net: number, country: string): number {
  return Math.round(net * 0.19 * 100) / 100; // HACK
}
