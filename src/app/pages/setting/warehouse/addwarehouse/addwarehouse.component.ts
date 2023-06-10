import { ToastrService } from './../../../service/toastr.service';
import { NbDialogRef } from "@nebular/theme";
import { WarehouseService } from "./../../../service/warehouse.service";

import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,

} from "@angular/core";



@Component({
  selector: "ngx-addwarehouse",
  templateUrl: "./addwarehouse.component.html",
  styleUrls: ["./addwarehouse.component.scss"],
})
export class AddwarehouseComponent implements OnInit {
  @ViewChild("search") searchRef: ElementRef;
  lat: number = 0;
  lng: number = 0;
  name: string = "";
  address: string = "";
  phoneNumber: string = "";
  ward: string = "";
  district: string = "";
  province: string = "";
  listProvince = [];
  listDistrict = [];
  listWard = [];
  formattedAddress: string = "";
  @Input()
  warehouse;

  @Input()
  status;

  constructor(
    private warehouseService: WarehouseService,
    private dialogRef: NbDialogRef<any>,
    private ToastrService: ToastrService
  ) { }
  ngOnInit(): void {
    if(this.warehouse){
      
      this.name = this.warehouse.name;
      this.phoneNumber = this.warehouse.phoneNumber
      this.address = this.warehouse.address
      this.province = this.warehouse.province
      this.district = this.warehouse.district
      this.ward = this.warehouse.ward
      this.listProvince = [{ProvinceName: this.warehouse.province}]
      this.listWard = [{WardName: this.warehouse.ward}]
      this.listDistrict = [{DistrictName: this.warehouse.district}]
    }
    if(!this.status){
      console.log(123123123);
      this.getProvince();
    }
    
    // this.getGeocoding();
  }

  // getGeocoding() {
  //   const address =
  //     "18B Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1";
  //   const geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ address: address }, (result, status) => {
  //     console.log(result, status);
  //     console.log(result[0].geometry.location.lat());
  //     // console.log(result[0].geometry.location.lng);

  //   });
  // }

  // findAddress() {
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(
  //       this.searchRef.nativeElement
  //     );
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         // some details

  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         this.address = place.formatted_address;
  //         // this.web_site = place.website;
  //         this.name = place.name;
  //         // this.zip_code = place.address_components[place.address_components.length - 1].long_name;
  //         //set latitude, longitude and zoom
  //         this.lat = place.geometry.location.lat();
  //         this.lng = place.geometry.location.lng();
  //         console.log(this.lat, this.lng);
  //         // this.zoom = 12;
  //       });
  //     });
  //   });
  // }

  add() {
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    let checkNumberPhone = regexPhoneNumber.test(this.phoneNumber)
    if (checkNumberPhone){

   
    const form_data = {
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      ward: this.ward,
      district: this.district,
      province: this.province,
      formattedAddress:
        this.address +
        ", " +
        this.ward +
        ", " +
        this.district +
        ", " +
        this.province,
    };
    
    if (this.name === "" || this.address === "" || this.phoneNumber === "" ||
      this.ward === "" || this.district === "" || this.province === "") {
      this.ToastrService.showToastFail("Vui lòng nhập đầy đủ thông tin")
    }
    else {
      this.warehouseService.addWarehouse(form_data).subscribe((result) => {
        if (result.success === true) {
          this.ToastrService.showToastSuccess("Thêm kho thành công")
        }
        if (result['error']) {
          this.ToastrService.showToastFail("Thêm kho thất bại")
        }
        this.closeDialog("addWarehouse");
      });
    }
  }else{
    this.ToastrService.showToastWarning("Sai định dạng số điện thoại")
  }

  }
  getProvince() {
    this.warehouseService.getAllProvince().subscribe((result) => {
      console.log(result);
      this.listProvince = result.data;
    });
  }
  getWard(id) {
    this.warehouseService.getAllWard(id).subscribe((result) => {
      this.listWard = result.data;
    });
  }
  getDistrict(id) {
    this.warehouseService.getAllDistrict(id).subscribe((result) => {
      this.listDistrict = result.data;
    });
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result });
  }

  update(){
    const form_data = {
      warehouseId: this.warehouse._id,
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      ward: this.ward,
      district: this.district,
      province: this.province,
      formattedAddress:
        this.address +
        ", " +
        this.ward +
        ", " +
        this.district +
        ", " +
        this.province,
    }
    this.warehouseService.updateWarehouse(form_data).subscribe(result =>{
      if (result["success"] === true){
        this.ToastrService.showToastSuccess("Cập nhật kho thành công")
      }
      if (result["error"]){
        this.ToastrService.showToastFail("Cập nhật kho thất bại")
      }
      this.closeDialog("editWarehouse")
    })
  }
}
