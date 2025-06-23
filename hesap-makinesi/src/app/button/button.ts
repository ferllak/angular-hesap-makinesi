import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; // Angular 17+ standalone component'ler için gerekli

@Component({
  selector: 'app-button',
  standalone: true, // Bu bileşen bağımsız olarak kullanılabilir
  imports: [CommonModule], // ngClass gibi direktifler için CommonModule gerekli
  templateUrl: './button.html', // Butonun HTML şablonu
  styleUrls: ['./button.scss'] // Butonun stil dosyası (çoğul 'styleUrls' doğru olan)
})
export class ButtonComponent {
  // Dışarıdan gelecek butonun hesaplama değerini (örn: '7', '+', '^') alır.
  @Input() value: string = '';

  // Dışarıdan gelecek butonun tipini (number, operator, action, equal) alır, stillendirme için.
  @Input() type: 'number' | 'operator' | 'action' | 'equal' = 'number';

  // Dışarıdan gelecek butonun görünen metnini alır (örn: 'xʸ' için 'xʸ', ama value '^' olabilir).
  @Input() text: string = ''; 

  // Butona tıklandığında dışarıya (parent bileşene) olay yayan EventEmitter.
  // Bu olayın adı 'btnClick', calculator.html'deki (btnClick) ile eşleşmeli.
  @Output() btnClick = new EventEmitter<string>();

  // Butona tıklandığında çalışacak metod.
  onClick() {
    // btnClick olayını yayar ve butonun value'sunu gönderir.
    this.btnClick.emit(this.value);
    console.log(`'${this.value}' değerine sahip butona tıklandı.`);
  }
}