// src/app/history.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService { // Sınıf adı HistoryService, History değil!
  private historySubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public history$: Observable<string[]> = this.historySubject.asObservable();
  private maxHistoryItems = 5;

  constructor() { }

  addHistory(entry: string) {
    const currentHistory = this.historySubject.getValue();
    const newHistory = [entry, ...currentHistory];

    if (newHistory.length > this.maxHistoryItems) {
      newHistory.pop();
    }
    this.historySubject.next(newHistory);
  }

  clearHistory() {
    this.historySubject.next([]);
  }
}