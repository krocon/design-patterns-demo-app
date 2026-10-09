// Folge 005 – Vorher: Factory, Registry und Interface – für genau EINEN Zahlungsanbieter.
export interface PaymentProvider { readonly id: string; charge(cents: number, currency: string): string }

class CardProvider implements PaymentProvider {
  readonly id = 'card';
  charge(cents: number) { return `card:${cents}`; }
}

export class PaymentProviderRegistry {
  private readonly providers = new Map<string, PaymentProvider>();
  register(p: PaymentProvider) { this.providers.set(p.id, p); }
  resolve(id: string) {
    const p = this.providers.get(id);
    if (!p) throw new Error(`Unknown provider ${id}`);
    return p;
  }
}

export class PaymentProviderFactory {
  constructor(private readonly registry: PaymentProviderRegistry) {}
  create(id: string): PaymentProvider { return this.registry.resolve(id); }
}

export function pay(amount: number): string {
  const registry = new PaymentProviderRegistry();
  registry.register(new CardProvider());
  return new PaymentProviderFactory(registry).create('card').charge(Math.round(amount * 100), 'EUR');
}
