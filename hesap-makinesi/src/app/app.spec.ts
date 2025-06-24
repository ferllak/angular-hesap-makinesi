// src/app/app.spec.ts
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { CalculatorComponent } from './calculator/calculator'; // CalculatorComponent'i doğru şekilde import edin

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CalculatorComponent // CalculatorComponent'i de imports'a ekliyoruz
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'hesap-makinesi' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('hesap-makinesi');
  });

  it('should render calculator component', () => { // Başlığı render etmek yerine calculator component'ini kontrol edelim
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-calculator')).toBeTruthy(); // app-calculator etiketinin varlığını kontrol et
  });
});