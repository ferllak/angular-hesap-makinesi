// src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    CalculatorComponent 
  ],
  template: `
    <app-calculator></app-calculator>
    `,
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'hesap-makinesi';
}