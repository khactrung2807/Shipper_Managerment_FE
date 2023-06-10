import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable, identity } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class WarehouseService {
  constructor(private httpClient: HttpClient) { }

  addWarehouse(form_data): Observable<any> {
    return this.httpClient
      .post("http://127.0.0.1:5000/api/warehouses/add/", form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  getAllWarehouse(): Observable<any> {
    return this.httpClient.get("http://127.0.0.1:5000/api/warehouses").pipe(
      catchError((err) => {
        return of(err || []);
      })
    );
  }
  getAllProvince(): Observable<any> {
    return this.httpClient
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
        { headers: this.getTokenHeader() }
      )
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }

  getAllDistrict(id): Observable<any> {
    return this.httpClient
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
        { headers: this.getTokenHeader(), params: { province_id: id } }
      )
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  getAllWard(id) {
    return this.httpClient
      .get(
        "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
        { headers: this.getTokenHeader(), params: { district_id: id } }
      )
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  deleteWarehouse(id): Observable<any> {
    return this.httpClient
      .post("http://127.0.0.1:5000/api/warehouses/delete/", id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  getWarehouseById(id): Observable<any> {
    return this.httpClient
      .get("http://127.0.0.1:5000/api/warehouses/warehouse/?warehouseId=" + id)
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  updateWarehouse(form_data): Observable<any> {
    return this.httpClient
      .put("http://127.0.0.1:5000/api/warehouses/update/", form_data)
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  getWarehouseByPhoneNumber(phoneNumber): Observable<any> {
    return this.httpClient
      .get(
        "http://127.0.0.1:5000/api/warehouses/phoneNumber/?phoneNumber=" +
        phoneNumber
      )
      .pipe(
        catchError((err) => {
          return of(err || []);
        })
      );
  }
  getTokenHeader() {
    let headers = new HttpHeaders();
    headers.append("Content-type", "application/json");
    headers = headers.set("Token", "0916c5c6-c74a-11eb-bb70-b6be8148d819");
    return headers;
  }

  getParams(params) {
    let param = new HttpParams();
    param.set("province_id", params);
    return param;
  }
}
