import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component'; // Doğru dosya adını kullanıyoruz: button.component.ts

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // ButtonComponent standalone olduğu için doğrudan import edebiliriz.
      imports: [ButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Değişiklikleri algıla ve component'i başlat
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test: Butona tıklandığında buttonClick event'ini tetiklemeli ve doğru değeri emit etmeli
  it('should emit buttonClick event with the correct text on click', () => {
    const testText = '5'; // Örnek bir buton metni
    component.text = testText; // Component'in 'text' input özelliğini ayarla
    fixture.detectChanges(); // Değişiklikleri algıla

    spyOn(component.buttonClick, 'emit'); // 'emit' metodunu izle

    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button'); // HTML'deki butonu seç
    buttonElement.click(); // Butona tıkla

    expect(component.buttonClick.emit).toHaveBeenCalledWith(testText); // 'emit' metodunun testText ile çağrıldığını doğrula
  });

  // Test: 'text' input değeri doğru şekilde görüntülenmeli
  it('should display the text input value', () => {
    const testText = 'C';
    component.text = testText; // Component'in 'text' input özelliğini ayarla
    fixture.detectChanges(); // Değişiklikleri algıla
    const buttonElement: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    // Butonun içeriğinin testText'i içerdiğini veya tam olarak eşit olduğunu kontrol edin
    // textContent genellikle boşlukları da içerir, trim() kullanmak iyi olabilir.
    expect(buttonElement.textContent?.trim()).toBe(testText);
  });

  // İsterseniz 'type' input'unu da test edebilirsiniz, ancak bu genelde görsel veya CSS ile ilgilidir.
  // Örnek: 'type' inputuna göre bir CSS sınıfı eklendiğini kontrol etmek gibi.
});