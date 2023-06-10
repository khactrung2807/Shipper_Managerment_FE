import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient) { }
  getAllReportShipper() {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/reports/shippers/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getReportByShipperId(form_data) {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/reports/shipper/detail/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
  getReportShipment() {
    return this.httpClient
      .get('http://127.0.0.1:5000/api/reports/shipments/')
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }

  getReportShipmentByFilter(form_data) {
    return this.httpClient
      .post('http://127.0.0.1:5000/api/reports/shipments/filter/', form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        }),
      );
  }
}
