import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historyEntries: string[] = [];

  constructor() { }

  // Geçmişe yeni bir giriş ekler
  addEntry(entry: string) {
    this.historyEntries.push(entry);
    // İsteğe bağlı: Geçmişi belirli bir boyutta tutmak için
    // if (this.historyEntries.length > 10) {
    //   this.historyEntries.shift(); // En eskiyi sil
    // }
  }

  // Mevcut geçmişi döndürür
  getHistory(): string[] {
    return [...this.historyEntries]; // Dizinin bir kopyasını döndürerek dışarıdan doğrudan değişmesini engelleriz
  }

  // Geçmişi temizler
  clearHistory() {
    this.historyEntries = [];
  }
}