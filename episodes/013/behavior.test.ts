import { beforeEach, describe, expect, it } from 'vitest';
import * as before from './before';
import * as after from './after';

describe('013 before: Test hängt an globaler DB', () => {
  beforeEach(() => { before.postgres.rows.length = 0; });   // Aufräumen nötig, sonst beeinflussen sich Tests
  it('speichert', () => expect(new before.OrderService().place({ id: 'A-1', total: 10 })).toBe(1));
  it('lehnt leere Bestellung ab', () => expect(() => new before.OrderService().place({ id: 'A-2', total: 0 })).toThrow());
});

describe('013 after: jede Instanz bekommt ihr eigenes Repository', () => {
  it('speichert', () => expect(new after.OrderService(new after.InMemoryOrderRepository()).place({ id: 'A-1', total: 10 })).toBe(1));
  it('lehnt leere Bestellung ab', () =>
    expect(() => new after.OrderService(new after.InMemoryOrderRepository()).place({ id: 'A-2', total: 0 })).toThrow());
  it('Fake statt DB', () => {
    const saved: after.Order[] = [];
    const svc = new after.OrderService({ save: o => saved.push(o), count: () => 42 });
    expect(svc.place({ id: 'A-3', total: 5 })).toBe(42);
    expect(saved).toHaveLength(1);
  });
});
