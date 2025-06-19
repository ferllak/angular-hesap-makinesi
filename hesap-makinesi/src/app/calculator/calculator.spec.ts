import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator'; // Burası 'CalculatorComponent' olmalı

describe('CalculatorComponent', () => { // Burası 'CalculatorComponent' olmalı
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent] // Burası 'CalculatorComponent' olmalı
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});