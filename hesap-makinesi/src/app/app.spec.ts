// src/app/app.spec.ts
import { TestBed, ComponentFixture } from '@angular/core/testing'; // ComponentFixture'ı import et
import { App } from './app'; // app.ts dosyasındaki App bileşenini import ediyoruz
import { Calculator } from './calculator/calculator'; // Calculator bileşenini test için import et

describe('App', () => {
  let fixture: ComponentFixture<App>; // fixture tipini belirt
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, Calculator], // App ve Calculator (standalone olduğu için) ikisini de imports'a ekle
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
    fixture.detectChanges(); // Initial change detection
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'Angular Hesap Makinesi' title`, () => {
    expect(app.title).toEqual('Angular Hesap Makinesi');
  });

  it('should render calculator component', () => { // Async/await ve RouterTestingHarness olmadan
    const compiled = fixture.nativeElement as HTMLElement;
    // Hesap makinesi bileşeninin selector'ü olan 'app-calculator'ın sayfada olup olmadığını kontrol eder
    expect(compiled.querySelector('app-calculator')).toBeTruthy();
  });
});