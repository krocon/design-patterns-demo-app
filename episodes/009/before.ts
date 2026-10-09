// Folge 009 – Vorher: Konstruktor mit sieben Parametern. Was bedeutet true, false, null?
export class Order {
  constructor(
    readonly id: string,
    readonly customer: string,
    readonly items: { sku: string; qty: number }[],
    readonly giftWrap: boolean,
    readonly express: boolean,
    readonly note: string | null,
    readonly currency: string,
  ) {}
}

export function sampleOrder(): Order {
  return new Order('A-1', 'Max', [{ sku: 'BOOK-1', qty: 2 }], true, false, null, 'EUR');
}
