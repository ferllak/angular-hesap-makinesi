import { Component, OnInit } from '@angular/core'; // OnInit ekledik
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
export class CalculatorComponent implements OnInit { // OnInit implementasyonu
  currentInput: string = '0'; // Ekran üzerinde gösterilen anlık girdi veya sonuç
  history: string[] = [];     // Hesaplama geçmişini tutar
  private historyLimit: number = 5; // Geçmişte gösterilecek maksimum kayıt sayısı
  private firstOperand: number | null = null; // İlk işlenen sayı
  private operator: string | null = null;     // Mevcut operatör (+, -, *, /, ^)
  private waitingForSecondOperand: boolean = false; // İkinci sayının girilmesini bekleyip beklemediği

  constructor() { } 

  ngOnInit() {
    // Bileşen başlatıldığında çalışacak kodlar (şu an için boş)
  }

  // Sayı butonlarına basıldığında
  pressNumber(num: string) {
    if (this.currentInput === '0' || this.waitingForSecondOperand) {
      this.currentInput = num; // Eğer '0' ise veya yeni sayı bekleniyorsa, ekranı yeni sayıyla değiştir
      this.waitingForSecondOperand = false;
    } else {
      this.currentInput += num; // Değilse, sayıyı mevcut girdiye ekle
    }
  }

  // Operatör butonlarına basıldığında (+, -, *, /, ^)
  pressOperator(op: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.currentInput); // İlk operantı ayarla
    } else if (!this.waitingForSecondOperand) {
      // Eğer zaten bir ilk operant ve operatör varsa, önceki işlemi tamamla
      const result = this.calculate(this.firstOperand, this.operator!, parseFloat(this.currentInput));
      this.addHistoryEntry(`${this.firstOperand} ${this.operator} ${parseFloat(this.currentInput)} = ${result}`); 
      this.currentInput = result.toString(); // Sonucu ekrana yaz
      this.firstOperand = result; // Sonucu yeni ilk operant yap
    }
    this.operator = op; // Yeni operatörü ayarla
    this.waitingForSecondOperand = true; // İkinci operantı beklemeye başla
  }

  // Eşittir butonuna basıldığında
  pressEqual() {
    if (this.firstOperand !== null && this.operator !== null && !this.waitingForSecondOperand) {
      const secondOperand = parseFloat(this.currentInput); // İkinci operantı al
      const result = this.calculate(this.firstOperand, this.operator, secondOperand); // Hesaplamayı yap

      this.addHistoryEntry(`${this.firstOperand} ${this.operator} ${secondOperand} = ${result}`); // Geçmişe ekle

      this.currentInput = result.toString(); // Sonucu ekrana yaz
      this.firstOperand = null; // İlk operantı sıfırla
      this.operator = null;     // Operatörü sıfırla
      this.waitingForSecondOperand = false; // Yeni işleme hazır ol
    }
  }

  // Temizle (C) butonuna basıldığında
  pressClear() {
    this.currentInput = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    this.history = []; // Geçmişi de temizle
  }

  // Geri al (←) butonuna basıldığında
  pressBackspace() {
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1); // Son karakteri sil
    } else {
      this.currentInput = '0'; // Tek karakter kaldıysa veya boşsa '0' yap
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
    if (!isNaN(num) && num >= 0) { // Sadece pozitif sayıların karekökünü al
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
      this.history.shift(); // En eski kaydı sil (limit aşılırsa)
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
          return NaN; // Hata durumunda NaN döndür
        }
        return num1 / num2;
      case '^': return Math.pow(num1, num2); // Üslü sayı hesaplama
      default: return NaN; // Tanımsız operatör durumunda
    }
  }
}