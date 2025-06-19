import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button';
import { HistoryService } from '../history/history.service'; // <-- Bu şekilde olmalı
import { CalculationService } from '../calculation/calculation.service'; // <-- Fazladan '}' ve '=' silindi
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

  // Hem HistoryService'i hem de CalculationService'i enjekte ediyoruz
  constructor(
    private historyService: HistoryService,
    private calculationService: CalculationService // CalculationService'i enjekte ettik
  ) { }

  // HistoryService'ten geçmişi almak için getter metot
  get history(): string[] {
    return this.historyService.getHistory();
  }

  pressClear() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    this.historyService.clearHistory(); // Servisin metodunu çağırıyoruz
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
      // Hesaplamayı artık CalculationService'e devrediyoruz
      const result = this.calculationService.performCalculation(this.operator, this.firstOperand, inputValue);
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
    // Hesaplamayı artık CalculationService'e devrediyoruz
    const result = this.calculationService.performCalculation(this.operator, this.firstOperand, secondOperand);

    // Geçmişe ekleme: Servisin metodunu çağırıyoruz
    this.historyService.addEntry(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`);

    this.currentInput = String(result);
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondOperand = false;
    console.log('Eşittir butonu tıklandı');
  }
}