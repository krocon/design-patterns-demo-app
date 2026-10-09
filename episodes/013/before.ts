// Folge 013 – Vorher: OrderService baut sich seine Datenbank selbst.
// Im Test hängt man an der echten (hier simulierten) Datenbank – austauschen unmöglich.
export interface Order { id: string; total: number }

export const postgres = { rows: [] as Order[] };          // simuliert die echte DB

export class PostgresOrderRepository {
  save(order: Order) { postgres.rows.push(order); }
  count() { return postgres.rows.length; }
}

export class OrderService {
  private readonly repo = new PostgresOrderRepository();  // feste Abhängigkeit
  place(order: Order): number {
    if (order.total <= 0) throw new Error('Leere Bestellung');
    this.repo.save(order);
    return this.repo.count();
  }
}
