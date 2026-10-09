// Folge 011 – Vorher: Caching und Logging per Vererbung fest eingebaut.
// Nur Logging? Nur Cache? Andere Reihenfolge? → noch eine Unterklasse (Klassen-Explosion).
export class PriceService {
  constructor(protected readonly prices: Record<string, number>) {}
  getPrice(sku: string): number { return this.prices[sku] ?? 0; }
}

export class CachedLoggingPriceService extends PriceService {
  private readonly cache = new Map<string, number>();
  readonly log: string[] = [];

  override getPrice(sku: string): number {
    this.log.push(`getPrice(${sku})`);
    if (!this.cache.has(sku)) this.cache.set(sku, super.getPrice(sku));
    return this.cache.get(sku)!;
  }
}
