// Folge 010 – Vorher: Checkout spricht direkt mit dem Fremd-SDK. Cent-Umrechnung,
// Fehlercodes und SDK-Details stecken mitten in der Fachlogik – an jeder Aufrufstelle.
export class LegacyPaySdk {
  chargeCents(amountInCents: number, currencyCode: number): { status: number; txn?: string } {
    if (amountInCents <= 0) return { status: 402 };
    return { status: 200, txn: `LP-${currencyCode}-${amountInCents}` };
  }
}

export function checkout(sdk: LegacyPaySdk, amountEur: number): string {
  const res = sdk.chargeCents(Math.round(amountEur * 100), 978); // 978 = EUR (ISO 4217)
  if (res.status !== 200) throw new Error(`Zahlung abgelehnt (${res.status})`);
  return res.txn!;
}
