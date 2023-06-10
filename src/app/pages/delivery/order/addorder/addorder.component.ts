
import { ToastrService } from './../../../service/toastr.service';
import { MapsAPILoader } from '@agm/core';
import { OrderService } from './../../../service/order.service';
import { NbDialogRef } from "@nebular/theme";
import { ServiceshippingService } from "./../../../service/serviceshipping.service";
import { WarehouseService } from "./../../../service/warehouse.service";
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from "@angular/core";


export interface Location {
  latitude: number;
  longitude: number;
  mapType: string;
  zoom: number;
  markers: Array<Marker>;
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
  selector: "ngx-addorder",
  templateUrl: "./addorder.component.html",
  styleUrls: ["./addorder.component.scss"],
})
export class AddorderComponent implements OnInit {
  @ViewChild('search') searchRef: ElementRef;
  currentDate = new Date().toLocaleDateString();
  constructor(
    private WarehouseService: WarehouseService,
    private ServiceshippingService: ServiceshippingService,
    private dialogRef: NbDialogRef<any>,
    private orderService: OrderService,
    private MapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ToastrService: ToastrService,
    private changeDetection: ChangeDetectorRef
  ) {

  }
  @Input() orderdetail;
  @Input() status;
  location: Location;
  selectedMarker: Marker
  addressComponent = [];
  listProvince = [];
  listDistrict = [];
  listWard = [];
  listService = [];
  listWarehouse = [];
  district;
  ward;
  price: number = 0;
  cod: number = 0;
  weight: number = 0;
  note: string = "";
  warehouse;
  customerName: string = "";
  customerPhoneNumber: string = "";
  customerEmail: string = "";
  formattedAddress: string = "";
  address: string = "";
  province;
  serviceShipping;
  fee: number = 0;
  distanceShip = "";
  dateStarted: string = "";
  value: number = 0;
  productName: string = "";
  productType: string = "";
  productId: string = "";
  origin;
  destination;
  statusOrder;
  token;
  ngOnInit(): void {

    if (this.orderdetail) {
      console.log(this.orderdetail);

      this.productName = this.orderdetail.product.name
      this.productType = this.orderdetail.product.type
      this.weight = this.orderdetail.product.weight
      this.value = this.orderdetail.value
      this.cod = this.orderdetail.order.cod
      this.note = this.orderdetail.note
      this.warehouse = this.orderdetail.warehouse
      this.customerName = this.orderdetail.order.customerName
      this.customerEmail = this.orderdetail.order.customerEmail
      this.customerPhoneNumber = this.orderdetail.order.customerPhoneNumber
      this.province = this.orderdetail.order.province
      this.district = this.orderdetail.order.district
      this.ward = this.orderdetail.order.ward
      this.address = this.orderdetail.order.address
      this.formattedAddress = this.orderdetail.order.formattedAddress
      this.dateStarted = this.orderdetail.order.dateStarted
      this.distanceShip = this.orderdetail.order.distance
      this.serviceShipping = this.orderdetail.order.serviceShipping
      this.fee = this.orderdetail.order.fee
      this.statusOrder = this.orderdetail.order.status === 3 ? "Chờ phản hồi" : this.orderdetail.order.status === 1 ? "Mới" :
        this.orderdetail.order.status === 5 ? "Đang giao hàng":  this.orderdetail.order.status === 7 ? "Thành công": "Thất bại"
      this.listProvince = [{ ProvinceName: this.orderdetail.order.province }]
      this.listDistrict = [{ DistrictName: this.orderdetail.order.district }]
      this.listWard = [{ WardName: this.orderdetail.order.ward }]
      this.listWarehouse = [this.orderdetail.warehouse]
      this.listService = [this.orderdetail.order.serviceShipping]
      this.getAllWarehouse();
      this.getAllProvince();
      this.getAllService();
    }
    else {
      this.setCurrentPosition();
      this.getAllWarehouse();
      this.getAllProvince();
      this.getAllService();
    }

  }
  ngAfterViewInit() {
    this.findAddress();

  }
  add() {
    const regexValue = /^\d*(\.\d+)?$/
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let checkNumberPhone = regexPhoneNumber.test(this.customerPhoneNumber)
    let checkEmail = regexEmail.test(this.customerEmail);
    let checkValue = regexValue.test(this.value.toString());
    let checkCod = regexValue.test(this.cod.toString());
    if (!checkValue || !checkCod) {
      this.ToastrService.showToastWarning("Giá trị đơn hàng không đúng định dạng")
    } else if (checkNumberPhone && checkEmail) {
      const form_data = {
        productName: this.productName,
        productType: this.productType,
        weight: this.weight,
        value: this.value,
        cod: this.cod,
        note: this.note,
        warehouseId: this.warehouse._id,
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        customerPhoneNumber: this.customerPhoneNumber,
        province: this.province,
        district: this.district,
        ward: this.ward,
        address: this.address,
        formattedAddress: this.formattedAddress,
        dateStarted: new Date(this.dateStarted),
        distance: parseFloat(this.distanceShip),
        serviceShippingId: this.serviceShipping._id,
        fee: this.fee,
        status: "1"
      }

      if (this.productName === "" || this.productType === "" || this.weight === 0 || this.value === 0 ||
        this.cod === 0 || this.customerName === "" || this.customerEmail === "" || this.customerPhoneNumber === "" ||
        this.province === "" || this.district === "" || this.ward === "" || this.address === "" ||
        this.formattedAddress === "" || this.dateStarted === "" || this.serviceShipping === "") {
        this.ToastrService.showToastFail("Vui lòng nhập đầy đủ thông tin")
      }
      else {
        this.orderService.addOrder(form_data).subscribe((result) => {
          if (!result['error']) {
            this.ToastrService.showToastSuccess("Thêm đơn hàng thành công")
          }
          if (result['error']) {
            this.ToastrService.showToastFail("Thêm đơn hàng thất bại")
          }
          this.closeDialog("addOrder");
        })
      }
    } else {
      this.ToastrService.showToastWarning("Nhập sai định dạng email hoặc số điện thoại")
    }

  }
  getAllProvince() {
    this.WarehouseService.getAllProvince().subscribe((result) => {
      this.listProvince = result.data;
      console.log(this.listProvince);
    });
  }
  getAllDistrict(id) {
    this.WarehouseService.getAllDistrict(id).subscribe((result) => {
      this.listDistrict = result.data;
      console.log(this.listDistrict);
    });
  }
  getAllWard(id) {
    this.WarehouseService.getAllWard(id).subscribe((result) => {
      this.listWard = result.data;
    });
  }

  getAllWarehouse() {
    this.WarehouseService.getAllWarehouse().subscribe((result) => {
      this.listWarehouse = result.warehouseDocument;
      console.log(this.listWarehouse);
    });
  }
  getAllService() {
    this.ServiceshippingService.getAllServiceShipping().subscribe((result) => {
      this.listService = result.serviceShippingDocument;
      console.log(this.listService);
    });
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result });
  }
  getGeocoding(formatted_address) {
    const address = formatted_address
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, (result, status) => {
      return result[0];
    });
  }
  calculateDistance(origin, destination) {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways: false,
      avoidTolls: false
    },
      ((result) => {

        var distance_split = result.rows[0].elements[0].distance.text.split(" km");
        this.distanceShip = distance_split[0];
      })
    );
  }
  selectAddress(address) {
    this.origin = address.formattedAddress;

  }
  findAddress() {
    this.MapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchRef.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // some details
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.formattedAddress = place.formatted_address;
          this.destination = place.formatted_address;
          this.addressComponent = place.formatted_address.split(', ')
          this.listWard = [{ WardName: this.addressComponent[1] }]
          this.listDistrict = [{ DistrictName: this.addressComponent[2] }]
          this.listProvince = [{ ProvinceName: this.addressComponent[3] }]
          this.address = this.addressComponent[0]
          this.ward = this.addressComponent[1]
          this.district = this.addressComponent[2]
          this.province = this.addressComponent[3]

          console.log(this.listWard, this.district, this.province);
          var lat = place.geometry.location.lat();
          var lng = place.geometry.location.lng()
          if (this.origin !== null) {
            this.calculateDistance(this.origin, { lat: lat, lng: lng })
          }
          // this.web_site = place.website;
          // this.name = place.name;
          // this.zip_code = place.address_components[place.address_components.length - 1].long_name;
          //set latitude, longitude and zoom
          // this.lat = place.geometry.location.lat();
          // this.lng = place.geometry.location.lng();
          console.log(place);
          console.log(this.formattedAddress);
          // this.zoom = 12;
        });
      });
    });
  }
  calculateFee() {
    if (this.serviceShipping.typeShipping === "distance") {
      for (let f of this.serviceShipping.fee) {
        if (this.distanceShip >= f.from && this.distanceShip <= f.to) {
          this.fee = f.value
          console.log(this.fee);
        }
      }
    }
    if (this.serviceShipping.typeShipping === "weight") {
      for (let f of this.serviceShipping.fee) {
        if (this.distanceShip >= f.from && this.distanceShip <= f.to) {
          this.fee = f.value
          console.log(this.fee);
        }
      }
    }
  }

  addMarker(lat: number, lng: number) {
    this.location.markers = [{
      lat,
      lng,
      label: this.getAddress(lat, lng)
    }]
  }
  selectMarker(event) {
    this.selectedMarker = {
      lat: event.latitude,
      lng: event.longitude,
      label: this.getAddress(event.latitude,
        event.longitude)
    }

  }
  getAddress(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      this.ngZone.run(() => {
        console.log(results[0]);

        const address = results[0].formatted_address;
        this.formattedAddress = address;
        this.addressComponent = results[0].formatted_address.split(', ')
        this.listWard = [{ WardName: this.addressComponent[1] }]
        this.listDistrict = [{ DistrictName: this.addressComponent[2] }]
        this.listProvince = [{ ProvinceName: this.addressComponent[3] }]
        this.address = this.addressComponent[0]
        this.ward = this.addressComponent[1]
        this.district = this.addressComponent[2]
        this.province = this.addressComponent[3]
        this.destination = address;
        if (this.origin !== null) {
          this.calculateDistance(this.origin, this.destination)
        }
        this.changeDetection.detectChanges()
        return address
      });
    });
  }
  setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords

        this.location = {
          latitude,
          longitude,
          mapType: "roadmap",
          zoom: 17,
          markers:
            []
        }
      });
    } else {
      alert("Geolocation is not supported by this browser, please use google chrome.");
    }
  }
  markerDragEnd(coords: any, $event: MouseEvent) {
    this.location.latitude = coords.latitude
    this.location.longitude = coords.longitude
  }
  update() {
    const form_data = {
      productId: this.orderdetail.product._id,
      productName: this.productName,
      productType: this.productType,
      weight: this.weight,
      value: this.value,
      cod: this.cod,
      note: this.note,
      warehouseId: this.warehouse._id,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhoneNumber: this.customerPhoneNumber,
      province: this.province,
      district: this.district,
      ward: this.ward,
      address: this.address,
      formattedAddress: this.formattedAddress,
      dateStarted: this.dateStarted,
      distance: parseFloat(this.distanceShip),
      serviceShippingId: this.serviceShipping._id,
      fee: this.fee,
      orderId: this.orderdetail.order._id,
      orderDetailId: this.orderdetail._id
    }
    this.orderService.updateOrder(form_data).subscribe(result => {
      console.log(result);

      if (!result["error"]) {
        this.ToastrService.showToastSuccess("Cập nhật thành công")
      }
      if (result["error"]) {
        this.ToastrService.showToastFail("Cập nhật thất bại")
      }
      this.closeDialog("editOrder")
    })
  }
}
