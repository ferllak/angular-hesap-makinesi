import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { HistoryService } from '../history/history.service'; // <-- Burası düzeltildi!

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.html',
  styleUrl: './calculator.scss',
  standalone: true,
  imports: [CommonModule, ButtonComponent]
})
export class CalculatorComponent {
  currentInput: string = '0';

  private firstOperand: number | null = null;
  private operator: string | null = null;
  private waitForSecondOperand: boolean = false;

  constructor(private historyService: HistoryService) { } // <-- Constructor güncellendi

  // HistoryService'ten geçmişi almak için getter metot
  get history(): string[] {
    return this.historyService.getHistory();
  }

  pressClear() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    this.historyService.clearHistory(); // <-- Servis metodu çağrıldı
    console.log('Clear butonu tıklandı');
  }

  pressBackspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
    }
    console.log('Backspace butonu tıklandı');
  }

  pressPercent() {
    const num = parseFloat(this.currentInput);
    if (!isNaN(num)) {
      this.currentInput = (num / 100).toString();
    }
    console.log('Yüzde butonu tıklandı');
  }

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

  pressEqual() {
    if (this.firstOperand === null || this.operator === null) {
      return;
    }

    const secondOperand = parseFloat(this.currentInput);
    const result = this.performCalculation(this.operator, this.firstOperand, secondOperand);

    this.historyService.addEntry(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`); // <-- Servis metodu çağrıldı

    this.currentInput = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    console.log('Eşittir butonu tıklandı');
  }

  private performCalculation(operator: string, firstOperand: number, secondOperand: number): number {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        if (secondOperand === 0) {
          console.error("Sıfıra bölme hatası!");
          return NaN;
        }
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }
}