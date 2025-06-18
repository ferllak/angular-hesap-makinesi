// src/app/app.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ngFor, ngIf gibi direktifler için gerekli
import { RouterOutlet } from '@angular/router'; // Eğer Angular Router kullanılıyorsa eklenmeli

// Calculator bileşenini doğru yoldan import ediyoruz.
// Senin dosya yapına göre 'src/app/calculator/calculator.ts' olduğu için yolu bu şekilde belirliyoruz.
import { Calculator } from './calculator/calculator';

@Component({
  selector: 'app-root', // Bu, index.html dosyasında kullanılan HTML etiketi olacaktır (<app-root></app-root>)
  standalone: true,     // Bu bileşenin bağımsız (standalone) olduğunu belirtiriz
  imports: [
    CommonModule,   // Standalone bileşenler modül bağımlılıklarını buraya ekler
    RouterOutlet,   // Eğer yönlendirme (routing) kullanıyorsanız
    Calculator      // Hesap makinesi bileşenini buraya ekliyoruz
  ],
  template: `
    <app-calculator></app-calculator>
  `,
  styles: [`
    /* app.ts için temel stiller */
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; /* Tam viewport yüksekliğini kapla */
      width: 100vw;    /* Tam viewport genişliğini kapla */
      background: linear-gradient(135deg, #fce4ec, #f8bbd0); /* Hoş bir arka plan */
      box-sizing: border-box; /* Padding ve border'ın genişliğe dahil olmasını sağlar */
    }
  `]
})
export class App { // <<< Buradaki 'export class App' çok önemli!
  title = 'Angular Hesap Makinesi';
}