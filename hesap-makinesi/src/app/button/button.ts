import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html', // button.html dosyasını işaret eder
  styleUrl: './button.scss'     // button.scss dosyasını işaret eder
})
export class ButtonComponent {
  // Dışarıdan gelecek buton değerini (örneğin '7', '+', 'C') alır.
  @Input() value: string = '';

  // Dışarıdan gelecek buton tipini (number, operator, action) alır.
  // Bu, farklı stiller uygulamak için kullanılır.
  @Input() type: 'number' | 'operator' | 'action' = 'number';

  // Butona tıklandığında dışarıya (parent bileşene) olay yayan EventEmitter.
  // string türünde bir değer (value) gönderecek.
  @Output() buttonClick = new EventEmitter<string>();

  // Butona tıklandığında çalışacak metod.
  onClick() {
    // buttonClick olayını yayar ve butonun değerini (value) gönderir.
    this.buttonClick.emit(this.value);
    // Konsola tıklanan butonun değerini yazdır (hata ayıklama için).
    console.log(`'${this.value}' değerine sahip butona tıklandı.`);
  }
}