// Folge 006 – Nachher: SOLID kompakt.
// S: OrderService orchestriert nur · O: neue Versandart = neue Klasse · L: jede Rate hält den Vertrag
// I: kleine Interfaces · D: OrderService hängt von Abstraktionen ab, nicht von Details.
export interface Order { id: string; weightKg: number; shipping: string; email: string }

export interface ShippingRate { cost(order: Order): number }        // Vertrag: Ergebnis >= 0
export interface OrderRepository { save(order: Order): void }       // I: nur, was gebraucht wird
export interface Notifier { orderPlaced(order: Order): void }

export const standard: ShippingRate = { cost: () => 4.99 };
export const express: ShippingRate = { cost: o => 9.99 + o.weightKg };

export class OrderService {
  constructor(private readonly rates: Record<string, ShippingRate>,
              private readonly repo: OrderRepository,
              private readonly notifier: Notifier) {}

  placeOrder(order: Order): number {
    const cost = this.rates[order.shipping].cost(order);
    this.repo.save(order);
    this.notifier.orderPlaced(order);
    return cost;
  }
}
