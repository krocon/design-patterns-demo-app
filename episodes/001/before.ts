// Folge 001 – Vorher: „nur kurz was drangehängt“, Story für Story.
export function calc(o: any, f: boolean) {
  let t = 0;
  for (const x of o.items) t += x.price * x.qty;
  if (f) t = t * 0.9;
  if (t < 50) t += 4.99; // räumen wir später auf (2019)
  return t;
}

export { calc as orderTotal };
