import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HistoryEntity } from '../models/api-dtos'; 
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  // API URL'ini environment dosyasından alıyoruz
  private apiUrl = environment.apiUrl + '/api/history'; // Path'in geri kalanını ekleyebilirsiniz

  constructor(private http: HttpClient) { }

  // Aşağıdaki metotlar eski kodunuzdan geldi, muhtemelen kullanıyorsunuz.
  // Eğer models/api-dtos.ts dosyanızda HistoryEntity yoksa hata alırsınız.
  getHistory(): Observable<HistoryEntity[]> {
    return this.http.get<HistoryEntity[]>(`${this.apiUrl}/getHistory`);
  }

  clearHistory(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/clearHistory`, {});
  }
}