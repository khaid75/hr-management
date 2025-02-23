import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {
getTotalEmployees() {
    
  }
  
  private apiUrl = 'http://localhost:8081/api/attendance';
  getTotalAttends() {
    //totalAttends
    return this.http.get(`${this.apiUrl}/totalAttends`);
  }


  constructor(private http: HttpClient) {}

  addAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/newAtt`, attendance);
  }
  

  getAllAttendance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteAttendance(id: number): Observable<string> {
    return this.http.delete(`http://localhost:8081/api/attendance/delete/${id}`, { responseType: 'text' });
  }
  
}
