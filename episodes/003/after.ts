// Folge 003 – Nachher: sprechende Namen, Guard Clauses, keine Magic Numbers.
export interface Customer { email: string; active: boolean; deleted: boolean; lastLogin: number }

const DAY_MS = 24 * 60 * 60 * 1000;
const ACTIVE_WITHIN_DAYS = 30;

export function newsletterRecipients(customers: Customer[], now: number): string[] {
  return customers.filter(c => isReachable(c, now)).map(c => c.email).sort();
}

function isReachable(customer: Customer, now: number): boolean {
  if (!customer.active || customer.deleted) return false;
  const daysSinceLogin = (now - customer.lastLogin) / DAY_MS;
  return daysSinceLogin < ACTIVE_WITHIN_DAYS;
}
