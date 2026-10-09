// Folge 009 – Nachher: Builder. Lesbar, mit Standardwerten und Validierung in build().
import { Order } from './before';

export class OrderBuilder {
  private items: { sku: string; qty: number }[] = [];
  private giftWrap = false;
  private express = false;
  private note: string | null = null;
  private currency = 'EUR';

  constructor(private readonly id: string, private readonly customer: string) {}

  withItem(sku: string, qty = 1) { this.items.push({ sku, qty }); return this; }
  asGift() { this.giftWrap = true; return this; }
  expressShipping() { this.express = true; return this; }
  withNote(note: string) { this.note = note; return this; }
  inCurrency(currency: string) { this.currency = currency; return this; }

  build(): Order {
    if (this.items.length === 0) throw new Error('Bestellung ohne Artikel');
    return new Order(this.id, this.customer, [...this.items], this.giftWrap, this.express, this.note, this.currency);
  }
}

export function sampleOrder(): Order {
  return new OrderBuilder('A-1', 'Max').withItem('BOOK-1', 2).asGift().build();
}
