// Folge 007 – Vorher: jede neue Versandart verlängert die if/else-Kette.
export function shippingCost(method: string, weightKg: number): number {
  if (method === 'dhl') {
    return 4.99 + weightKg * 0.5;
  } else if (method === 'ups') {
    return weightKg > 10 ? 19.99 : 9.99;
  } else if (method === 'pickup') {
    return 0;
  } else {
    throw new Error(`Unbekannte Versandart: ${method}`);
  }
}
