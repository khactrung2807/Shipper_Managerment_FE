import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeliverytimesService {

  constructor(private httpClient: HttpClient) { }
  addShipment(form_data): Observable<any> {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/shipments/add/', form_data, {headers: this.getTokenHeader()})
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getAllShipment(): Observable<any> {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/shipments/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getShipmentById(id): Observable<any>{    
    return this.httpClient
      .get("http://127.0.0.1:5000/api/shipments/shipmentdetail/?shipmentId=" + id)
      // .get("http://127.0.0.1/api/shipments/shipmentdetail/")
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getShipmentByShipperId(id): Observable<any>{
    return this.httpClient
      .get("http://127.0.0.1:5000/api/shipments/shipmentdetail/shipper/?shipperId=" + id)
      // .get("http://127.0.0.1/api/shipments/shipmentdetail/")
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }

  updateShipment(form_data): Observable<any>{
    return this.httpClient
      .put('http://127.0.0.1:5000/api/shipments/update/', form_data, {headers: this.getTokenHeader()})
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
  deleteShipment(id): Observable<any>{
    return this.httpClient
      .post('http://127.0.0.1:5000/api/shipments/delete/', id, {headers: this.getTokenHeader()})
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getShipmentByShipperOrDate(form_data): Observable<any>{
    return this.httpClient
      .post("http://127.0.0.1:5000/api/reports/shipper/detail" , form_data)
      // .get("http://127.0.0.1/api/shipments/shipmentdetail/")
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
}
