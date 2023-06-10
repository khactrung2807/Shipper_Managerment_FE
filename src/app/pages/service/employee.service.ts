import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {

  }
  addEmployee(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/employees/add/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllEmployee(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/employees/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  deleteEmployee(id): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/employees/delete', id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );

  }

  getEmployeeById(id): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/employees/employee/?employeeId=' + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }

  updateEmployee(form_data): Observable<any> {
    return this.httpClient
      .put('http://127.0.0.1:5000/api/employees/update/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getEmployeeByEmailOrPhone(form_data):Observable<any>{
    return this.httpClient
      .post('http://127.0.0.1:5000/api/employees/search/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
}
