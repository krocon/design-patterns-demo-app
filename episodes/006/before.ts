// Folge 006 – Vorher: eine Klasse, die speichert, Versand rechnet UND Mails verschickt.
export interface Order { id: string; weightKg: number; shipping: 'standard' | 'express'; email: string }

export class OrderService {
  readonly saved: Order[] = [];
  readonly sentMails: string[] = [];

  placeOrder(order: Order): number {
    let cost: number;
    switch (order.shipping) {             // jede neue Versandart = Änderung hier (verletzt O)
      case 'standard': cost = 4.99; break;
      case 'express': cost = 9.99 + order.weightKg; break;
    }
    this.saved.push(order);               // Speichern (S: zweite Verantwortung)
    this.sentMails.push(`${order.email}: Bestellung ${order.id}`); // Mailen (dritte Verantwortung)
    return cost;
  }
}
