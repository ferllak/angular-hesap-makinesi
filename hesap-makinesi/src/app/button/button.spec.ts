import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button'; // 'Button' yerine 'ButtonComponent' olmalı

describe('ButtonComponent', () => { // 'Button' yerine 'ButtonComponent' olmalı
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent] // Buradaki import da 'Button' yerine 'ButtonComponent' olmalı
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});