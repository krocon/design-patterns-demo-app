// Folge 014 – Vorher: Singleton mit globalem, veränderbarem Zustand.
// Jeder kann von überall lesen UND schreiben – versteckte Abhängigkeit, Tests beeinflussen sich.
export class Config {
  private static instance: Config | undefined;
  currency = 'EUR';
  vatRate = 0.19;
  private constructor() {}
  static getInstance(): Config {
    return (Config.instance ??= new Config());
  }
}

export function grossPrice(net: number): string {
  const cfg = Config.getInstance();                // woher kommt das? Sieht man der Signatur nicht an
  return `${(net * (1 + cfg.vatRate)).toFixed(2)} ${cfg.currency}`;
}
