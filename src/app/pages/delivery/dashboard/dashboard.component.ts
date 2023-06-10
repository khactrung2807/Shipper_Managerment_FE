import { ShipperService } from './../../service/shipper.service';
import { Observable } from "rxjs";
import { ChangeDetectorRef, NgZone } from "@angular/core";

import { OrderService } from "./../../service/order.service";
import { DeliverytimesService } from "./../../service/deliverytimes.service";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

export interface DeliveryTime {
  _id: string;
  dateShip: string;
  warehouse: string;
  order: string;
  totalCOD: number;
  totalSuccess: number;
  totalFail: number;
  mDate: string;
}
export interface OrderDetail {
  _id: string;
  serviceShipping: string;
  warehouse: string;
  order: string;
}
export interface Location {
  latitude: number;
  longitude: number;
  mapType: string;
  zoom: number;
}
export interface Marker {
  lat: number;
  lng: number;
  label;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
@Component({
  selector: "ngx-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  location: Location;
  selectedMarker: Marker;
  listMarker: Array<Marker>;
  origin;
  destination;
  listShipment = [];
  listShipper = [];
  listOrderDetail = [];
  listOrderId = [];
  listTemp = [];
  shipmentId = "";
  orderId = "";
  codsuccess = 0;
  marker: Marker;
  shipper;
  previous;

  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false
  // listPosition = [{
  //   origin: {
  //     lat: 10.8419138,
  //     lng: 106.6783878
  //   },
  //   destination: {
  //     lat: 10.815744,
  //     lng: 106.7082379
  //   }
  // }, {
  //   origin: {
  //     lat: 10.8419138,
  //     lng: 106.6783878
  //   },
  //   destination: {
  //     lat: 10.805175,
  //     lng: 106.636446
  //   }
  // }];
  position;
  constructor(
    private DeliverytimesService: DeliverytimesService,
    private ngZone: NgZone,
    private OrderService: OrderService,
    private changeDetection: ChangeDetectorRef,
    private ShipperService: ShipperService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }
  displayedColumns: string[] = ["shipment"];
  displayedColumns1: string[] = ["order"];
  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(map((params) =>{
      this.shipmentId = params.get('id')
      console.log(this.shipmentId);
      return params.get('id')
    }))
      

    this.get();
    this.getAllShipper();
    this.location = {
      latitude: 10.785577355817743,
      longitude: 106.70027398241608,
      mapType: "terrain",
      zoom: 17,
    };
  }

  getShipmentByShipperId() {
    this.DeliverytimesService.getShipmentByShipperId(
      "6062e0024b9fe82e78cabaa1"
    ).subscribe((result) => {
      console.log("shipmentbyshipper:", result);
    });
  }

  get() {
    this.DeliverytimesService.getAllShipment().subscribe((result) => {
      this.listShipment = result.shipmentDocument;
      console.log(this.listShipment);
    });
  }
  getShipmentById(item) {
    this.shipmentId = item._id;
    this.DeliverytimesService.getShipmentById(item._id).subscribe((result) => {
      this.listOrderId = result.shipmentDocument.listOrderId;
      console.log(result);
      this.shipper = result.shipmentDocument.shipper
      this.getManyOrder();
      this.addMarker(
        result.shipmentDocument.shipper.lat,
        result.shipmentDocument.shipper.lng,
        result.shipmentDocument.shipper.name.split("")[0]
      );
      console.log(this.marker);

    });
  }
  getManyOrder() {
    const form_data = {
      listOrderId: this.listOrderId,
    };
    this.OrderService.getManyOrderDetail(form_data).subscribe((result) => {
      this.listOrderDetail = result.orderDetail;
      // result.orderDetail.forEach(element => {
      //   this.directionMap(element)
      // });
      // this.getGeoLocation(result.orderDetail[0].order.formattedAddress).subscribe((result) => {
      //   this.destination = { lat: result.lat(), lng: result.lng() }
      // })
    });
  }
  directionMap(item) {
    this.orderId = item._id;
    this.getGeoLocation(item.warehouse.formattedAddress).subscribe((result) => {
      this.origin = { lat: result.lat(), lng: result.lng() };
      this.changeDetection.detectChanges();
    });
    this.getGeoLocation(item.order.formattedAddress).subscribe((result) => {
      this.destination = { lat: result.lat(), lng: result.lng() };
      this.changeDetection.detectChanges();
    });
  }
  getLatLng(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (result, status) => {
      this.ngZone.run(() => {
        if (status === "OK") {
          var latitude = result[0].geometry.location.lat();
          var longitude = result[0].geometry.location.lng();
          return { lat: latitude, lng: longitude };
        }
      });
    });
  }
  addMarker(lat: number, lng: number, name: string) {
    this.marker = ({
      lat,
      lng,
      label: {
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold',
        text: name
      },
    });
  }

  clickedMarker(infowindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infowindow;
  }
  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      label: this.shipper.name,
    };
  }
  markerDragEnd(coords: any, $event: MouseEvent) {
    this.location.latitude = coords.latitude;
    this.location.longitude = coords.longitude;
  }
  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      location: latlng,
    };
    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        const address = results[0].formatted_address;
        return address;
      });
    });
  }

  getGeoLocation(address: string): Observable<any> {
    console.log("Getting address: ", address);
    let geocoder = new google.maps.Geocoder();
    return Observable.create((observer) => {
      geocoder.geocode(
        {
          address: address,
        },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            observer.next(results[0].geometry.location);
            observer.complete();
          } else {
            console.log("Error: ", results, " & Status: ", status);
            observer.error();
          }
        }
      );
    });
  }

  getShipperById(item) {
    this.listMarker = [];
    this.ShipperService.getShipperById(item._id).subscribe(result => {
      this.shipper = result["shipperDocument"]
      this.listShipper = [result["shipperDocument"]]
      for (let index = 0; index < this.listShipper.length; index++) {
        this.listMarker.push({
          lat: this.listShipper[index].lat,
          lng: this.listShipper[index].lng,
          label: {
            name: this.listShipper[index].name, numberOfVehicle: this.listShipper[index].numberOfVehicle,
            vehicle: this.listShipper[index].vehicle
          }
        })
      }
    })
  }
  getAllShipper() {
    this.listMarker = [];
    this.ShipperService.getAllShipper().subscribe(result => {
      this.listShipper = result["shipperDocument"]
      for (let index = 0; index < this.listShipper.length; index++) {
        this.listMarker.push({
          lat: this.listShipper[index].lat,
          lng: this.listShipper[index].lng,
          label: {
            name: this.listShipper[index].name, numberOfVehicle: this.listShipper[index].numberOfVehicle,
            vehicle: this.listShipper[index].vehicle
          }
        })
      }
    })
  }
  loadNext() {
    if (this.loading) { return }
    this.loading = true;
  }

  getShipperByStatus(status) {
    const form_data = { status: status }
    this.listMarker = [];
    this.ShipperService.getShipperByStatus(form_data).subscribe(result => {
      console.log(result["shipperDocument"]);
      this.listShipper = result["shipperDocument"]
      for (let index = 0; index < this.listShipper.length; index++) {
        this.listMarker.push({
          lat: this.listShipper[index].lat,
          lng: this.listShipper[index].lng,
          label: {
            name: this.listShipper[index].name, numberOfVehicle: this.listShipper[index].numberOfVehicle,
            vehicle: this.listShipper[index].vehicle
          }
        })
      }
    })
  }
}
