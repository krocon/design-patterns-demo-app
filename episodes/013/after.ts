// Folge 013 – Nachher: Dependency Injection. Die Abhängigkeit kommt von außen (Constructor Injection),
// OrderService kennt nur das Interface. Funktioniert ohne Framework – ein Container ist optional.
export interface Order { id: string; total: number }

export interface OrderRepository { save(order: Order): void; count(): number }

export class OrderService {
  constructor(private readonly repo: OrderRepository) {}
  place(order: Order): number {
    if (order.total <= 0) throw new Error('Leere Bestellung');
    this.repo.save(order);
    return this.repo.count();
  }
}

export class InMemoryOrderRepository implements OrderRepository {
  private readonly rows: Order[] = [];
  save(order: Order) { this.rows.push(order); }
  count() { return this.rows.length; }
}
