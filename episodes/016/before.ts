// Folge 016 – Vorher: Shotgun Surgery. Geldformat und Rundung an vielen Stellen verstreut.
// Neue Währung CHF? → Warenkorb, Rechnung, Mail, Export … jede Stelle einzeln anfassen.
export function cartLine(name: string, price: number): string {
  return `${name}: ${price.toFixed(2).replace('.', ',')} €`;
}

export function invoiceTotal(net: number): string {
  const gross = Math.round(net * 1.19 * 100) / 100;
  return `Gesamt: ${gross.toFixed(2).replace('.', ',')} €`;
}

export function mailSubject(orderId: string, amount: number): string {
  return `Bestellung ${orderId} über ${amount.toFixed(2).replace('.', ',')} €`;
}
