// Folge 003 – Vorher: clever, kurz – und unlesbar.
export const f = (u: any[], n: number) =>
  u.filter(x => x.active && !x.deleted && (n - x.lastLogin) / 864e5 < 30).map(x => x.email).sort();

export { f as newsletterRecipients };
