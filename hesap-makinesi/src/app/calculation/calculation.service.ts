// src/app/calculation/calculation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalculateRequestDto, ResultDto } from '../models/api-dtos';
import { environment } from '../../environments/environment'; // environment import'u

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  // API URL'ini environment dosyasından alıyoruz
  private apiUrl = environment.apiUrl + '/api/calculator'; // Path'in geri kalanını ekleyebilirsiniz

  constructor(private http: HttpClient) { }

  // ... servis metotlarınız ...
}
@Injectable({
  providedIn: 'root'
})
export class CalculatorService { // Sınıf adının 'CalculatorService' olduğundan emin olun
  private apiUrl = 'http://s1.divlop.com:5001/api/calculator';

  constructor(private http: HttpClient) { }

  add(data: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${this.apiUrl}/add`, data);
  }

  subtract(data: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${this.apiUrl}/subtract`, data);
  }

  multiply(data: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${this.apiUrl}/multiply`, data);
  }

  divide(data: CalculateRequestDto): Observable<ResultDto> {
    if (data.parameter2 === 0) {
      return new Observable(observer => {
        observer.error(new Error('Sıfıra bölme hatası!'));
      });
    }
    return this.http.post<ResultDto>(`${this.apiUrl}/divide`, data);
  }

  power(data: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${this.apiUrl}/power`, data);
  }

  squareRoot(data: CalculateRequestDto): Observable<ResultDto> {
    return this.http.post<ResultDto>(`${this.apiUrl}/squareRoot`, data);
  }
}