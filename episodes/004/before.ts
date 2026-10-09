// Folge 004 – Vorher: „DRY“ übertrieben – zwei verschiedene Regeln in eine Funktion mit Flags gepresst.
export function validate(v: string, isEmail: boolean, isZip: boolean, allowEmpty: boolean) {
  if (allowEmpty && v === '') return true;
  if (v.trim() === '') return false;
  if (isEmail) return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  if (isZip) return /^\d{5}$/.test(v);
  return true;
}
