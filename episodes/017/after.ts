// Folge 017 – Nachher: erste Grenzen ziehen. Jeder Bereich besitzt seine Daten
// und bietet eine kleine öffentliche API. Abhängigkeiten zeigen in eine Richtung: orders → inventory.
export function createInventory(initial: Record<string, number>) {
  const stock = new Map(Object.entries(initial));         // privat – niemand sonst kommt dran
  return {
    reserve(sku: string): void {
      const left = stock.get(sku) ?? 0;
      if (left <= 0) throw new Error('Ausverkauft');
      stock.set(sku, left - 1);
    },
    available: (sku: string) => stock.get(sku) ?? 0,
  };
}
export type Inventory = ReturnType<typeof createInventory>;

export function createOrders(inventory: Pick<Inventory, 'reserve'>) {
  const orders: { id: string; sku: string }[] = [];
  return {
    place(sku: string): string {
      inventory.reserve(sku);
      const id = `A-${orders.length + 1}`;
      orders.push({ id, sku });
      return id;
    },
    count: () => orders.length,
  };
}
