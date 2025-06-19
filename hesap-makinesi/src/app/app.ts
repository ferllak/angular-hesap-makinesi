import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalculatorComponent } from './calculator/calculator'; // CalculatorComponent'i import ettik

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [
    CommonModule,
    CalculatorComponent // CalculatorComponent'i imports dizisine ekliyoruz
  ]
})
export class App {
  name = 'angular-hesap-makinesi';
}