// src/app/calculator/calculator.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { HistoryService } from '../history';
import { TwoDigitPipe } from '../two-digit-pipe';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, TwoDigitPipe],
  templateUrl: './calculator.html', // Kontrol et: Dosya yolu doğru mu?
  styleUrls: ['./calculator.scss']  // Kontrol et: Dosya yolu doğru mu?
})
export class Calculator {
  currentInput: string = '0';
  firstNumber: number = 0;
  operator: string | null = null;
  waitingForSecondNumber: boolean = false;
  history$: Observable<string[]>;

  constructor(private historyService: HistoryService) {
    this.history$ = this.historyService.history$;
  }

  // >>> Bu fonksiyonların isimleri HTML'deki 'click' olaylarıyla aynı olmalı <<<
  pressNumber(num: string) {
    if (num === '.' && this.currentInput.includes('.')) {
      return;
    }
    if (this.waitingForSecondNumber) {
      this.currentInput = num;
      this.waitingForSecondNumber = false;
    } else {
      this.currentInput = (this.currentInput === '0' && num !== '.') ? num : this.currentInput + num;
    }
  }

  pressOperator(op: string) {
    if (this.operator && this.waitingForSecondNumber) {
      this.operator = op;
      return;
    }
    if (this.firstNumber === 0 && this.operator === null) {
      this.firstNumber = parseFloat(this.currentInput);
    } else if (this.operator) {
      this.calculate();
      this.firstNumber = parseFloat(this.currentInput);
    }
    this.operator = op;
    this.waitingForSecondNumber = true;
  }

  calculate() {
    if (this.operator === null || this.firstNumber === null) {
      return;
    }
    const secondNumber = parseFloat(this.currentInput);
    if (isNaN(secondNumber)) {
      this.currentInput = 'Error';
      this.resetState();
      return;
    }
    let result: number;
    const historyEntry = `${this.firstNumber} ${this.operator} ${secondNumber}`;
    switch (this.operator) {
      case '+': result = this.firstNumber + secondNumber; break;
      case '-': result = this.firstNumber - secondNumber; break;
      case '*': result = this.firstNumber * secondNumber; break;
      case '/':
        if (secondNumber === 0) { this.currentInput = 'Error (Div by 0)'; this.resetState(); return; }
        result = this.firstNumber / secondNumber; break;
      default: return;
    }
    result = parseFloat(result.toFixed(8));
    this.currentInput = String(result);
    this.historyService.addHistory(`${historyEntry} = ${this.currentInput}`);
    this.operator = null;
    this.waitingForSecondNumber = false;
  }

  pressPercent() {
    let value = parseFloat(this.currentInput);
    if (isNaN(value)) { this.currentInput = 'Error'; this.resetState(); return; }
    if (this.firstNumber !== 0 && this.operator !== null) {
        if (this.operator === '+' || this.operator === '-') {
            value = this.firstNumber * (value / 100);
        } else {
            value = value / 100;
        }
    } else {
        value = value / 100;
    }
    this.waitingForSecondNumber = true;
    this.currentInput = String(value);
  }

  pressEqual() {
    this.calculate();
    this.firstNumber = 0;
  }

  changeSign() {
    if (this.currentInput === '0' || this.currentInput === 'Error' || isNaN(parseFloat(this.currentInput))) {
      return;
    }
    if (this.currentInput.startsWith('-')) {
      this.currentInput = this.currentInput.substring(1);
    } else {
      this.currentInput = '-' + this.currentInput;
    }
  }

  pressBackspace() {
    if (this.currentInput === 'Error') {
      this.pressClear();
      return;
    }
    if (this.currentInput === '0' && this.currentInput.length === 1) {
      return;
    }
    this.currentInput = this.currentInput.slice(0, -1);
    if (this.currentInput === '' || this.currentInput === '-') {
      this.currentInput = '0';
    }
  }

  pressClear() {
    this.currentInput = '0';
    this.resetState();
    this.historyService.clearHistory(); // HistoryService'in clearHistory metodunu çağır
  }

  private resetState() {
    this.firstNumber = 0;
    this.operator = null;
    this.waitingForSecondNumber = false;
  }
}