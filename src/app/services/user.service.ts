import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 private apiUrl ='http://localhost:8081/api/users';
 constructor(private http: HttpClient) {}


 getTotalAll(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);  // Assuming response is an array of users
}


  // getEmployees(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);
  // }

  // getEmployeeById(id: number): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/${id}`);
  // }

  // addEmployee(employee: any): Observable<any> {
  //   return this.http.post<any>(this.apiUrl+'/add', employee);
  // }

  // updateEmployee(id: number, employee: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl}/${id}`, employee);
  // }

  // deleteEmployee(id: number): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl}/${id}`);
  // }
}
