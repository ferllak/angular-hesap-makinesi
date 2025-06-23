import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router'; // <-- Bu satırı sil

// Kendi component'lerini import et
import { CalculatorComponent } from './calculator/calculator'; 

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    CommonModule,
    // RouterOutlet, // <-- Bu satırı sil
    CalculatorComponent 
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'hesap-makinesi'; 
}