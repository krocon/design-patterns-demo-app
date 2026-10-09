// Folge 011 – Nachher: Decorator. Gleiches Interface, Hülle um Hülle – frei kombinierbar.
// (Nicht verwechseln mit TypeScript-Decorators wie @Injectable – das ist etwas anderes.)
export interface PriceService { getPrice(sku: string): number }

export class TablePriceService implements PriceService {
  constructor(private readonly prices: Record<string, number>) {}
  getPrice(sku: string) { return this.prices[sku] ?? 0; }
}

export class CachingPriceService implements PriceService {
  private readonly cache = new Map<string, number>();
  constructor(private readonly inner: PriceService) {}
  getPrice(sku: string) {
    if (!this.cache.has(sku)) this.cache.set(sku, this.inner.getPrice(sku));
    return this.cache.get(sku)!;
  }
}

export class LoggingPriceService implements PriceService {
  constructor(private readonly inner: PriceService, private readonly log: string[]) {}
  getPrice(sku: string) {
    this.log.push(`getPrice(${sku})`);
    return this.inner.getPrice(sku);
  }
}
