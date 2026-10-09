# Design Patterns & Anti-Patterns – Demo-Code

Code zur Videoreihe **„Design Patterns & Anti-Patterns in 60 Sekunden“** (DE + EN) auf YouTube.
20 kurze Folgen für Entwickler:innen aller Erfahrungsstufen und Tech Leads: konkreter Nutzen, typische Fehler, direkt anwendbare Best Practices.

> **Leitidee: Refactor often, refactor early.** Kleine Verbesserungen direkt beim Entwickeln – nicht erst, wenn der Code zum Problem wird.

## So ist jede Folge aufgebaut

```
episodes/NNN/
  before.ts          das Problem / Anti-Pattern
  after.ts           die Lösung
  behavior.test.ts   derselbe Test gegen before UND after
```

Der gemeinsame Test ist die Leitidee zum Anfassen: **erst Verhalten absichern, dann umbauen.**
Alle Beispiele stammen aus einem kleinen Online-Shop (Bestellung, Warenkorb, Versand, Zahlung).

```bash
git clone https://github.com/krocon/design-patterns-demo-app.git
cd design-patterns-demo-app
npm ci
npm test                    # alle Folgen
npm test -- episodes/007    # eine Folge
npm run typecheck
```

Voraussetzung: Node.js 22 oder neuer. TypeScript, getestet mit [Vitest](https://vitest.dev).

## Folgen

| # | Thema | Kategorie | Code |
|---|---|---|---|
| 001 | Refactor Often, Refactor Early – kontinuierliches Refactoring | Refactoring | [episodes/001](episodes/001) |
| 002 | Code Smells – 5 Warnsignale im Code | Refactoring | [episodes/002](episodes/002) |
| 003 | Clean Code – Lesbarkeit vor Cleverness | Clean Code | [episodes/003](episodes/003) |
| 004 | DRY vs. WET – wann Code-Duplikation sinnvoll ist | Principles | [episodes/004](episodes/004) |
| 005 | KISS & YAGNI – nicht zu früh abstrahieren | Principles | [episodes/005](episodes/005) |
| 006 | SOLID – die fünf Prinzipien kompakt erklärt | Principles | [episodes/006](episodes/006) |
| 007 | Strategy Pattern – statt endloser if/else-Ketten | Behavioral | [episodes/007](episodes/007) |
| 008 | Factory Pattern – Objekterzeugung sauber kapseln | Creational | [episodes/008](episodes/008) |
| 009 | Builder Pattern – komplexe Objekte lesbar erstellen | Creational | [episodes/009](episodes/009) |
| 010 | Adapter Pattern – inkompatible Schnittstellen verbinden | Structural | [episodes/010](episodes/010) |
| 011 | Decorator Pattern – Verhalten flexibel erweitern | Structural | [episodes/011](episodes/011) |
| 012 | Observer Pattern – Ereignisse statt enger Kopplung | Behavioral | [episodes/012](episodes/012) |
| 013 | Dependency Injection – Abhängigkeiten umdrehen | Principles | [episodes/013](episodes/013) |
| 014 | Singleton Anti-Pattern – globale Zustände vermeiden | Anti-Pattern | [episodes/014](episodes/014) |
| 015 | God Object – warum eine Klasse nicht alles können sollte | Anti-Pattern | [episodes/015](episodes/015) |
| 016 | Shotgun Surgery – eine Änderung, zehn betroffene Stellen | Anti-Pattern | [episodes/016](episodes/016) |
| 017 | Big Ball of Mud – wenn Architektur unkontrolliert wächst | Anti-Pattern | [episodes/017](episodes/017) |
| 018 | Modular Monolith – klare Grenzen ohne Microservice-Komplexität | Architecture | [episodes/018](episodes/018) |
| 019 | Strangler Pattern – Legacy-Systeme schrittweise ablösen | Architecture | [episodes/019](episodes/019) |
| 020 | Technical Debt – wann sie okay ist und wann sie gefährlich wird | Refactoring | [episodes/020](episodes/020) |

## Refactoring im Alltag (aus Folge 001)

1. **Während der Story:** Kleine Refactorings gehören zur normalen Umsetzung und zur Definition of Done.
2. **Keine Extratickets für Kleinigkeiten:** Namen verbessern, Methoden vereinfachen, Duplikate entfernen – solange der Code ohnehin bearbeitet wird.
3. **Verhalten absichern:** Erst Tests, dann refactoren (Red-Green-Refactor) – ohne fachliche Änderungen unbemerkt einzubauen.

Im Scaled Agile Framework (SAFe) ist Refactoring Teil des normalen Lean-Agile-Flows: Kleines läuft in der Story mit,
größere Refactorings werden als Enabler Stories im Backlog geplant ([SAFe: Refactoring](https://framework.scaledagile.com/refactoring/)).

## Quellen

Martin Fowler, *Refactoring* (2. Aufl. 2018) · Gamma, Helm, Johnson, Vlissides, *Design Patterns* (1994) ·
Robert C. Martin, *Clean Code* (2008) · Foote & Yoder, *Big Ball of Mud* (1997) ·
[refactoring.guru](https://refactoring.guru) · [martinfowler.com/bliki](https://martinfowler.com/bliki/)

## Lizenz

MIT
