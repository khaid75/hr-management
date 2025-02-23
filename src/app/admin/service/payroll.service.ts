import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payroll } from '../models/payroll';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  private baseUrl = 'http://localhost:8081/api/payroll';

  constructor(private http: HttpClient) {}

  getAllPayrolls(): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}`);
  }

  searchPayroll(name: string): Observable<Payroll[]> {
    return this.http.get<Payroll[]>(`${this.baseUrl}/search?name=${name}`);
  }

  addPayroll(payroll: Payroll): Observable<Payroll> {
    return this.http.post<Payroll>(`${this.baseUrl}`, payroll);
  }

  deletePayroll(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

