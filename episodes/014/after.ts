// Folge 014 – Nachher: EINE Instanz ist okay – aber einmal erzeugt und explizit weitergereicht.
// Unveränderlich, sichtbar in der Signatur, im Test frei wählbar.
export interface Config { readonly currency: string; readonly vatRate: number }

export function createConfig(overrides: Partial<Config> = {}): Config {
  return Object.freeze({ currency: 'EUR', vatRate: 0.19, ...overrides });
}

export function grossPrice(net: number, cfg: Config): string {
  return `${(net * (1 + cfg.vatRate)).toFixed(2)} ${cfg.currency}`;
}
