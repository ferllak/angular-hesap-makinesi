// src/app/calculator/calculator.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { CalculatorService } from '../calculation/calculation.service';
import { HistoryService } from '../history/history.service';
import { CalculateRequestDto, ResultDto, HistoryEntity } from '../models/api-dtos';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  private shouldClearDisplay: boolean = false;

  constructor(
    private calculatorService: CalculatorService,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.fetchHistory();
  }

  pressNumber(num: string) {
    console.log('--- pressNumber ---');
    console.log('Input Num:', num);
    console.log('Before: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);

    if (this.shouldClearDisplay) {
      console.log('Condition: shouldClearDisplay is TRUE');
      this.currentInput = num;
      this.shouldClearDisplay = false;
      this.waitingForSecondOperand = false;
      this.firstOperand = null;
      this.operator = null;
    } else if (this.currentInput === '0' || this.waitingForSecondOperand) {
      console.log('Condition: currentInput is \'0\' or waitingForSecondOperand is TRUE');
      this.currentInput = num;
      this.waitingForSecondOperand = false;
    } else {
      console.log('Condition: Appending number to currentInput');
      this.currentInput += num;
    }
    console.log('After: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
  }

  pressClear() {
    console.log('--- pressClear ---');
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.shouldClearDisplay = false;
    this.history = [];
    this.clearRemoteHistory();
    console.log('After Clear: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
  }

  pressBackspace() {
    console.log('--- pressBackspace ---');
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = '0';
      this.shouldClearDisplay = true;
    }
    console.log('After Backspace: currentInput=', this.currentInput);
  }

  pressOperator(op: string) {
    console.log('--- pressOperator ---');
    console.log('Operator Input:', op);
    console.log('Before: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);

    this.shouldClearDisplay = false;

    if (this.firstOperand === null) {
      console.log('Condition: firstOperand is NULL');
      this.firstOperand = parseFloat(this.currentInput);
    } else if (this.operator !== null) {
      console.log('Condition: operator is NOT NULL');
      if (!this.waitingForSecondOperand) {
        console.log('Executing previous calculation before new operator...');
        this.executeApiCalculation();
      } else {
        console.log('Operator change, no calculation executed yet.');
      }
    }
    this.operator = op;
    this.waitingForSecondOperand = true;
    console.log('After: firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
  }

  pressEqual() {
    console.log('--- pressEqual ---');
    console.log('Before: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand);
    if (this.firstOperand !== null && this.operator !== null && !this.waitingForSecondOperand) {
      console.log('Conditions met for executeApiCalculation');
      this.executeApiCalculation();
    } else {
      console.log('Conditions NOT met for executeApiCalculation');
    }
    console.log('After: firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand);
  }

  pressSquareRoot() {
    console.log('--- pressSquareRoot ---');
    const parameter1 = parseFloat(this.currentInput);
    if (isNaN(parameter1) || parameter1 < 0) {
      this.currentInput = 'Geçersiz Giriş!';
      this.resetCalculatorStateAll();
      this.shouldClearDisplay = true;
      console.log('Invalid input for square root.');
      return;
    }
    const requestData: CalculateRequestDto = { parameter1: parameter1, parameter2: 0 };
    this.currentInput = 'Hesaplanıyor...';
    console.log('Calling squareRoot API with:', requestData);
    this.calculatorService.squareRoot(requestData).subscribe({
      next: (response: ResultDto) => {
        console.log('API SquareRoot Success:', response);
        if (response && typeof response.result === 'number') {
          this.currentInput = response.result.toString();
          this.addHistoryEntry(`√${parameter1} = ${response.result}`);
          this.firstOperand = response.result;
          this.operator = null;
          this.waitingForSecondOperand = true;
          this.shouldClearDisplay = true;
          console.log('After SquareRoot Success: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
        } else {
          this.currentInput = 'API Yanıt Hatası';
          this.addHistoryEntry('API: Geçersiz yanıt.');
          this.resetCalculatorStateAll();
          this.shouldClearDisplay = true;
          console.log('API SquareRoot Success: Invalid response format.');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('Karekök API Hatası:', err);
        this.currentInput = 'API Hata!';
        this.addHistoryEntry('API Hatası: Konsolu kontrol edin.');
        this.resetCalculatorStateAll();
        this.shouldClearDisplay = true;
        console.log('After SquareRoot Error: currentInput=', this.currentInput);
      }
    });
  }

  pressPercent() {
    console.log('--- pressPercent ---');
    const num = parseFloat(this.currentInput);
    if (!isNaN(num)) {
      const result = num / 100;
      this.addHistoryEntry(`${num}% = ${result}`);
      this.currentInput = result.toString();
      this.firstOperand = result;
      this.operator = null;
      this.waitingForSecondOperand = true;
      this.shouldClearDisplay = true;
      console.log('After Percent: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand);
    }
  }

  private executeApiCalculation() {
    console.log('--- executeApiCalculation ---');
    console.log('Before API call: firstOperand=', this.firstOperand, 'operator=', this.operator, 'currentInput (secondOperand)=', this.currentInput);

    const secondOperand = parseFloat(this.currentInput);
    if (this.firstOperand === null || this.operator === null) {
      console.warn('Hesaplama için eksik operand veya operatör. İşlem iptal edildi.');
      return;
    }

    const requestData: CalculateRequestDto = {
      parameter1: this.firstOperand,
      parameter2: secondOperand
    };

    this.currentInput = 'Hesaplanıyor...';

    let calculationObservable: Observable<ResultDto>;

    switch (this.operator) {
      case '+':
        calculationObservable = this.calculatorService.add(requestData);
        break;
      case '-':
        calculationObservable = this.calculatorService.subtract(requestData);
        break;
      case '*':
        calculationObservable = this.calculatorService.multiply(requestData);
        break;
      case '/':
        if (secondOperand === 0) {
          this.currentInput = 'Sıfıra bölme!';
          this.resetCalculatorStateAll();
          this.shouldClearDisplay = true;
          console.log('Division by zero detected.');
          return;
        }
        calculationObservable = this.calculatorService.divide(requestData);
        break;
      case '^':
        calculationObservable = this.calculatorService.power(requestData);
        break;
      default:
        this.currentInput = 'Geçersiz İşlem';
        this.resetCalculatorStateAll();
        this.shouldClearDisplay = true;
        console.log('Invalid operator detected.');
        return;
    }

    console.log('API call initiated for:', this.operator, 'with data:', requestData);
    calculationObservable.subscribe({
      next: (response: ResultDto) => {
        console.log('API Calculation Success:', response);
        if (response && typeof response.result === 'number') {
          this.currentInput = response.result.toString();
          this.addHistoryEntry(`${this.firstOperand} ${this.operator} ${secondOperand} = ${response.result}`);

          this.firstOperand = response.result;
          this.operator = null;
          this.waitingForSecondOperand = true;
          this.shouldClearDisplay = true;

          console.log('After API Success Update: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
        } else {
          this.currentInput = 'API Yanıt Hatası';
          this.addHistoryEntry('API: Geçersiz yanıt formatı.');
          this.resetCalculatorStateAll();
          this.shouldClearDisplay = true;
          console.log('API Calculation Success: Invalid response format.');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.error('API Hesaplama Hatası:', err);
        this.currentInput = 'API Hata!';
        this.addHistoryEntry('API Hatası: Konsolu kontrol edin.');
        this.resetCalculatorStateAll();
        this.shouldClearDisplay = true;
        console.log('After API Error Update: currentInput=', this.currentInput);
      }
    });
  }

  private resetCalculatorStateAll() {
    console.log('--- resetCalculatorStateAll ---');
    this.firstOperand = null;
    this.operator = null;
    this.currentInput = '0';
    this.waitingForSecondOperand = false;
    this.shouldClearDisplay = false;
    console.log('After Reset All: currentInput=', this.currentInput, 'firstOperand=', this.firstOperand, 'operator=', this.operator, 'waitingForSecondOperand=', this.waitingForSecondOperand, 'shouldClearDisplay=', this.shouldClearDisplay);
  }

  fetchHistory() {
    console.log('--- fetchHistory ---');
    this.historyService.getHistory().subscribe({
      next: (historyEntities: HistoryEntity[]) => {
        console.log('History fetched successfully.');
        this.history = historyEntities.map((entry: HistoryEntity) => {
          const operatorSymbol = this.mapApiOperatorToSymbol(entry.operation);
          if (entry.operation === 'SQUARE_ROOT') {
            return `√${entry.parameter1} = ${entry.result} (${new Date(entry.date).toLocaleTimeString()})`;
          }
          return `${entry.parameter1} ${operatorSymbol} ${entry.parameter2} = ${entry.result} (${new Date(entry.date).toLocaleTimeString()})`;
        });
        if (this.history.length > this.historyLimit) {
          this.history = this.history.slice(this.history.length - this.historyLimit);
        }
        this.history.reverse();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Geçmişi Çekme Hatası:', err);
      }
    });
  }

  clearRemoteHistory() {
    console.log('--- clearRemoteHistory ---');
    this.historyService.clearHistory().subscribe({
      next: () => {
        console.log('Geçmiş API üzerinde temizlendi.');
        this.history = [];
      },
      error: (err: HttpErrorResponse) => console.error('Geçmiş Temizleme Hatası:', err)
    });
  }

  private addHistoryEntry(entry: string) {
    console.log('--- addHistoryEntry ---');
    this.history.unshift(entry);
    if (this.history.length > this.historyLimit) {
      this.history.pop();
    }
  }

  private mapApiOperatorToSymbol(apiOperator: string): string {
    switch (apiOperator) {
      case 'ADDITION': return '+';
      case 'SUBTRACTION': return '-';
      case 'MULTIPLICATION': return '*';
      case 'DIVISION': return '/';
      case 'POWER': return '^';
      case 'SQUARE_ROOT': return '√';
      default: return '';
    }
  }
}
