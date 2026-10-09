// Folge 018 – Nachher: Modular Monolith. EIN Deployment, aber Module mit klaren Grenzen:
// eigene Daten, öffentliche API, keine Zugriffe auf Interna. Aufrufe im Prozess, eine Transaktion.
// Im Repo würde jedes Modul ein Ordner sein: modules/inventory/index.ts, modules/orders/index.ts …
export interface InventoryApi { reserve(sku: string): void }
export interface NotificationsApi { orderPlaced(email: string, orderId: string): void }

export function inventoryModule(stock: Record<string, number>): InventoryApi {
  return {
    reserve(sku) {
      if ((stock[sku] ?? 0) <= 0) throw new Error('Ausverkauft');
      stock[sku]--;
    },
  };
}

export function ordersModule(deps: { inventory: InventoryApi; notifications: NotificationsApi }) {
  let next = 1;
  return {
    placeOrder(sku: string, email: string): string {
      deps.inventory.reserve(sku);            // Modulgrenze: nur über die öffentliche API
      const id = `A-${next++}`;
      deps.notifications.orderPlaced(email, id);
      return id;
    },
  };
}
