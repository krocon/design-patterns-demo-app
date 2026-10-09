// Folge 007 – Nachher: Strategy Pattern. Jede Versandart ist eine austauschbare Strategie.
// Neue Versandart = ein neuer Eintrag, keine Änderung an bestehender Logik.
export interface ShippingStrategy { cost(weightKg: number): number }

const strategies: Record<string, ShippingStrategy> = {
  dhl: { cost: kg => 4.99 + kg * 0.5 },
  ups: { cost: kg => (kg > 10 ? 19.99 : 9.99) },
  pickup: { cost: () => 0 },
};

export function shippingCost(method: string, weightKg: number): number {
  const strategy = strategies[method];
  if (!strategy) throw new Error(`Unbekannte Versandart: ${method}`);
  return strategy.cost(weightKg);
}
