import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button'; // ButtonComponent'in yolu

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class CalculatorComponent {
  // 1. Değişken Tanımlamaları:
  currentInput: string = '0';
  history: string[] = []; // History Observable yerine basit dizi yaptık

  private firstOperand: number | null = null;
  private operator: string | null = null;
  private waitForSecondOperand: boolean = false;

  // 2. Constructor (Eğer varsa, kendi kodunu buraya ekle):
  constructor() {
    // Örneğin, HistoryService'i burada enjekte edebilirsin:
    // constructor(private historyService: HistoryService) { ... }
  }

  // 3. Metot Tanımlamaları:

  // C butonu: Ekranı ve geçmişi temizler
  pressClear() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    this.history = []; // Geçmişi temizle <-- BURAYA EKLENECEK
    console.log('Clear butonu tıklandı');
  }

  // Geri tuşu (Backspace): Son karakteri siler
  pressBackspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
    }
    console.log('Backspace butonu tıklandı');
  }

  // Yüzde butonu: Sayının yüzdesini alır (Örnek mantık)
  pressPercent() {
    const num = parseFloat(this.currentInput);
    if (!isNaN(num)) {
      this.currentInput = (num / 100).toString();
    }
    console.log('Yüzde butonu tıklandı');
  }

  // Sayı butonları: Ekranı günceller
  pressNumber(number: string) {
    if (this.waitForSecondOperand) {
      this.currentInput = number;
      this.waitForSecondOperand = false;
    } else {
      if (number === '.' && this.currentInput.includes('.')) {
        return;
      }
      this.currentInput = this.currentInput === '0' && number !== '.' ? number : this.currentInput + number;
    }
    console.log(`Sayı butonu tıklandı: ${number}`);
  }

  // Operatör butonları: İşlemi ayarlar
  pressOperator(nextOperator: string) {
    const inputValue = parseFloat(this.currentInput);

    if (this.firstOperand === null) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.performCalculation(this.operator, this.firstOperand, inputValue);
      this.currentInput = String(result);
      this.firstOperand = result;
    }

    this.waitForSecondOperand = true;
    this.operator = nextOperator;
    console.log(`Operatör butonu tıklandı: ${nextOperator}`);
  }

  // Eşittir butonu: Hesaplamayı yapar
  pressEqual() {
    if (this.firstOperand === null || this.operator === null) {
      return;
    }

    const secondOperand = parseFloat(this.currentInput);
    const result = this.performCalculation(this.operator, this.firstOperand, secondOperand);

    // Geçmişe ekleme: <-- BURAYA EKLENECEK
    this.history.push(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`);

    this.currentInput = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    console.log('Eşittir butonu tıklandı');
    // Hesaplama sonucunu geçmişe ekleme mantığı (history$ veya servis)
  }

  // Hesaplama yardımcı metodu
  private performCalculation(operator: string, firstOperand: number, secondOperand: number): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }
}