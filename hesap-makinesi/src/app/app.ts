import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Genellikle Angular projelerinde temel direktifler için kullanılır

// Calculator bileşenini doğru isimle içeri aktarıyoruz.
// Senin calculator.ts dosyan 'export class CalculatorComponent' olarak tanımlanmıştır.
import { CalculatorComponent } from './calculator/calculator'; // <-- Bu satırı düzelt (Calculator yerine CalculatorComponent)

@Component({
  selector: 'app-root', // Ana bileşeninizin selector'ı bu olmalı
  standalone: true,     // Eğer projeniz standalone bileşenler kullanıyorsa bu satır olmalı
  templateUrl: './app.html',
  styleUrl: './app.scss',
  // CalculatorComponent'i imports dizisine ekliyoruz.
  imports: [
    CommonModule,
    CalculatorComponent // <-- Bu satırı düzelt (Calculator yerine CalculatorComponent)
  ]
})
export class App {
  // Uygulamanızın ana bileşenindeki mevcut kodunuz (eğer varsa)
  name = 'angular-hesap-makinesi'; // Veya başka bir isim
}