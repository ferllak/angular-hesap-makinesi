import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() { }

  performCalculation(operator: string, firstOperand: number, secondOperand: number): number {
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