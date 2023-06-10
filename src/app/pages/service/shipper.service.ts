import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private httpClient: HttpClient) { }
  addShipper(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/shippers/add/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllShipper(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/shippers/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  deleteShipper(id): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/shippers/delete', id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getShipperById(id): Observable<any>{
    return this.httpClient
      .get('http://127.0.0.1:5000/api/shippers/shipper/?shipperId=' + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  updateShipper(form_data): Observable<any>{
    return this.httpClient
    .put('http://127.0.0.1:5000/api/shippers/update/', form_data)
    .pipe(
      catchError((err) => {
        return of(err || []);
      }),
    );
  }
  getShipperByEmailOrPhone(form_data): Observable<any>{
    return this.httpClient
    .post('http://127.0.0.1:5000/api/shippers/search/', form_data)
    .pipe(
      catchError((err) => {
        return of(err || []);
      }),
    );
  }
  getShipperByStatus(status): Observable<any>{
    return this.httpClient
    .post('http://127.0.0.1:5000/api/shippers/getbystatus/', status)
    .pipe(
      catchError((err) => {
        return of(err || []);
      }),
    );
  }
}
