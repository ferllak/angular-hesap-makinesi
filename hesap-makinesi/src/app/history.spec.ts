// src/app/history.spec.ts
import { TestBed } from '@angular/core/testing';
import { HistoryService } from './history'; // History yerine HistoryService'i import et

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({}); // Servisler için boş bir test modülü yeterli
    service = TestBed.inject(HistoryService); // Servisi enjekte et
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add history entries', () => {
    service.addHistory('2 + 2 = 4');
    service.addHistory('5 * 3 = 15');
    service.history$.subscribe(history => {
      expect(history).toEqual(['5 * 3 = 15', '2 + 2 = 4']);
    });
  });

  it('should clear history', () => {
    service.addHistory('1 + 1 = 2');
    service.clearHistory();
    service.history$.subscribe(history => {
      expect(history).toEqual([]);
    });
  });

  it('should limit history items', () => {
    for (let i = 1; i <= 7; i++) {
      service.addHistory(`Item ${i}`);
    }
    service.history$.subscribe(history => {
      expect(history.length).toBe(5);
      expect(history[0]).toBe('Item 7'); // En yeni olan en üstte olmalı
      expect(history[4]).toBe('Item 3'); // En eski olan en altta olmalı
    });
  });
});