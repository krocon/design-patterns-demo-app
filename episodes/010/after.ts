// Folge 010 – Nachher: Adapter. Unser Code kennt nur PaymentGateway,
// das Fremd-SDK wird an EINER Stelle übersetzt. Anbieterwechsel = neuer Adapter.
import type { LegacyPaySdk } from './before';

export interface PaymentGateway { pay(amountEur: number): string }

export class LegacyPayAdapter implements PaymentGateway {
  constructor(private readonly sdk: LegacyPaySdk) {}

  pay(amountEur: number): string {
    const res = this.sdk.chargeCents(Math.round(amountEur * 100), 978);
    if (res.status !== 200) throw new Error(`Zahlung abgelehnt (${res.status})`);
    return res.txn!;
  }
}

export function checkout(gateway: PaymentGateway, amountEur: number): string {
  return gateway.pay(amountEur);
}
