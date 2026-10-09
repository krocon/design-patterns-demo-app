// Folge 019 – Nachher: Strangler Fig (Martin Fowler). Eine Fassade vor dem Altsystem leitet
// Route für Route auf neuen Code um. Der Rest geht weiter ans Altsystem – bis es abgeschaltet werden kann.
import { legacyShop, type Handler } from './before';

const migrated: Record<string, Handler> = {
  '/products': () => 'new:products',   // Schritt 1: umgezogen
  '/cart': () => 'new:cart',           // Schritt 2: umgezogen
};

export function stranglerFacade(legacy: Handler = legacyShop): Handler {
  return path => (migrated[path] ?? legacy)(path);
}

export const migrationProgress = () => Object.keys(migrated).length;
