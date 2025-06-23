import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ButtonComponent } from '../button/button'; 

@Component({
  selector: 'app-calculator',
  standalone: true, 
  imports: [
    CommonModule, 
    ButtonComponent 
  ],
  templateUrl: './calculator.html',
  styleUrls: ['./calculator.scss']
})
export class CalculatorComponent implements OnInit {
  currentInput: string = '0';
  history: string[] = [];     
  private historyLimit: number = 5; 
  private firstOperand: number | null = null; 
  private operator: string | null = null;     
  private waitingForSecondOperand: boolean = false; 

  constructor() { } 

  ngOnInit() {
    // Bileşen başlatıldığında çalışacak kodlar (şu an için boş)
  }

  // Sayı butonlarına basıldığında
  pressNumber(num: string) {
    if (this.currentInput === '0' || this.waitingForSecondOperand) {
      this.currentInput = num; 
      this.waitingForSecondOperand = false;
    } else {
      this.currentInput += num; 
    }
  }

  // Operatör butonlarına basıldığında (+, -, *, /, ^)
  pressOperator(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentInput); 
    } else if (!this.waitingForSecondOperand) {
      const result = this.calculate(this.firstOperand, this.operator!, parseFloat(this.currentInput));
      this.addHistoryEntry(`${this.firstOperand} ${this.operator} ${parseFloat(this.currentInput)} = ${result}`); 
      this.currentInput = result.toString(); 
      this.firstOperand = result; 
    }
    this.operator = op; 
    this.waitingForSecondOperand = true; 
  }

  // Eşittir butonuna basıldığında
  pressEqual() {
    if (this.firstOperand !== null && this.operator !== null && !this.waitingForSecondOperand) {
      const secondOperand = parseFloat(this.currentInput); 
      const result = this.calculate(this.firstOperand, this.operator, secondOperand); 

      this.addHistoryEntry(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`); 

      this.currentInput = result.toString(); 
      this.firstOperand = null; 
      this.operator = null;     
      this.waitingForSecondOperand = false; 
    }
  }

  // Temizle (C) butonuna basıldığında
  pressClear() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.history = []; 
  }

  // Geri al (←) butonuna basıldığında
  pressBackspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1); 
    } else {
      this.currentInput = '0'; 
    }
  }

  // Yüzde (%) butonuna basıldığında
  pressPercent() {
    const num = parseFloat(this.currentInput);
    if (!isNaN(num)) {
      const result = num / 100;
      this.addHistoryEntry(`${num}% = ${result}`); 
      this.currentInput = result.toString();
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    }
  }

  // Karekök (√) butonuna basıldığında
  pressSquareRoot() {
    const num = parseFloat(this.currentInput);
    if (!isNaN(num) && num >= 0) { 
      const result = Math.sqrt(num);
      this.addHistoryEntry(`√${num} = ${result}`); 
      this.currentInput = result.toString();
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    } else {
      this.currentInput = 'Hata'; 
      alert('Geçersiz işlem: Pozitif bir sayının karekökünü almalısınız.');
      this.firstOperand = null;
      this.operator = null;
      this.waitingForSecondOperand = false;
    }
  }

  // Geçmişe girdi ekler
  private addHistoryEntry(entry: string) {
    this.history.push(entry);
    if (this.history.length > this.historyLimit) {
      this.history.shift(); 
    }
  }

  // Temel hesaplama mantığı
  calculate(num1: number, op: string, num2: number): number {
    switch (op) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': 
        if (num2 === 0) {
          alert('Sıfıra bölme yapılamaz!');
          return NaN; 
        }
        return num1 / num2;
      case '^': return Math.pow(num1, num2); 
      default: return NaN; 
    }
  }
}