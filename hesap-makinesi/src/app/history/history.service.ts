import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyEntries: string[] = [];

  constructor() { }

  addEntry(entry: string) {
    this.historyEntries.push(entry);
  }

  getHistory(): string[] {
    return [...this.historyEntries];
  }

  clearHistory() {
    this.historyEntries = [];
  }
}