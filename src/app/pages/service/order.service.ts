
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  addOrder(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/orders/add/', form_data, { headers: this.getTokenHeader() })
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllOrderDetail(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/orderdetails/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllOrderDetailByStatus(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/orderdetails/status')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getManyOrderDetail(listOrderId): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/orderdetails/many/', listOrderId)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getOrderDetailById(id): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/orderdetails/orderdetail/?orderDetailId=' + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  cancelOrder(id): Observable<any> {
    return this.httpClient
      .put('http://127.0.0.1:5000/api/orders/faildelivery/?orderId=', id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getOrderByEmployee(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/orderdetails/employee/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }

  getTokenHeader() {
    let headers = new HttpHeaders()
    headers.append('Content-type', 'application/json')
    headers = headers.set("token", localStorage.getItem("token"))
    return headers
  }
  updateOrder(form_data){
    return this.httpClient
      .put('http://127.0.0.1:5000/api/orderdetails/update', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
}
