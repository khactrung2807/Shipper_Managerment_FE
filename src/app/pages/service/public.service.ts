
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor(private httpClient: HttpClient) { }
  login(form_data): Observable<any>{
    return this.httpClient
      .post('http://127.0.0.1:5000/api/users/sign-in/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }

  getUser(id): Observable<any>{
    
    return this.httpClient
      .get('http://127.0.0.1:5000/api/users/user/?userId=' + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  updatePassword(form_data): Observable<any>{
    return this.httpClient
      .put('http://127.0.0.1:5000/api/users/user/updatepassword', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  resetPassword(form_data): Observable<any>{
    return this.httpClient
      .post('http://127.0.0.1:5000/api/users/user/resetpassword', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
}
