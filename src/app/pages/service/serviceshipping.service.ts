import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceshippingService {

  constructor(private httpClient: HttpClient) { }
  addServiceShipping(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/serviceshippings/add/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getServiceShippingById(id): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/serviceshippings/serviceshippingdetail/?serviceShippingId=' + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllServiceShipping(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/serviceshippings/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  deleteServiceShipping(id): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/serviceshippings/delete', id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  updateServiceShipping(form_data): Observable<any>{
    return this.httpClient
    .put('http://127.0.0.1:5000/api/serviceshippings/update/', form_data)
    .pipe(
      catchError((err) => {
        return of(err || []);
      }),
    );
  }
  // getTokenHeader() {
  //   let headers = new HttpHeaders()
  //   headers.append('Content-type', 'application/json')
  //   headers = headers.set("Token", "")
  //   return headers
  // }
}
