import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  @Input() value: string = '';
  @Input() type: 'number' | 'operator' | 'action' | 'equal' = 'number';
  @Input() text: string = ''; // Butonun görünen metnini alır

  @Output() btnClick = new EventEmitter<string>();

  onClick() {
    this.btnClick.emit(this.value);
    // console.log(`'${this.value}' değerine sahip butona tıklandı.`); // Hata ayıklama için kullanılabilir
  }
}