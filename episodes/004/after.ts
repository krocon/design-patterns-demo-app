// Folge 004 – Nachher: zwei Regeln, zwei Funktionen. Ähnlicher Code ist okay,
// solange es verschiedenes Wissen ist. Gemeinsam ist nur das echte gemeinsame Wissen: „optional“.
export const isValidEmail = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export const isValidZip = (v: string) => /^\d{5}$/.test(v);

export const optional = (check: (v: string) => boolean) => (v: string) => v === '' || check(v);
