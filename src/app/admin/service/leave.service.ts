import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:8081/api/leave';

  constructor(private http: HttpClient) { }

  // সকল লিভ দেখানো
  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // লিভ স্ট্যাটাস আপডেট (Approve / Reject)
  updateLeaveStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  getLeavesByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/status/${status}`);
  }


  // লিভ ডিলিট করা
  deleteLeave(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

