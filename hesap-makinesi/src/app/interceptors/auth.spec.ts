import { TestBed } from '@angular/core/testing';
import { AuthInterceptor } from './auth'; 

describe('AuthInterceptor', () => { // Describe bloğunun ismini de güncelliyoruz
  let service: AuthInterceptor; // Service tipini AuthInterceptor olarak belirliyoruz

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // TestBed.inject(AuthInterceptor) ile doğru servisi enjekte ediyoruz
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});