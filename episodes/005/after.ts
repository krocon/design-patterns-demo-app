// Folge 005 – Nachher: KISS. Eine Funktion für den einen Fall, den es wirklich gibt.
// Kommt ein zweiter Anbieter, wird refactort (Strategy, Folge 007) – mit Tests ist das billig.
export function pay(amount: number): string {
  return `card:${Math.round(amount * 100)}`;
}
