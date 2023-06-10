import { ToastrService } from './../../../service/toastr.service';
import { ShipperService } from './../../../service/shipper.service';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-addshipper',
  templateUrl: './addshipper.component.html',
  styleUrls: ['./addshipper.component.scss']
})
export class AddshipperComponent implements OnInit {
  name: string = "";
  phoneNumber: string = "";
  email: string = "";
  password: string = "";
  vehicle: string = "";
  numberOfVehicle: string = "";
  gender: string = "";
  @Input()
  shipper;
  @Input()
  status;
  constructor(private shipperService: ShipperService, private dialogRef: NbDialogRef<any>,
    private ToastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.shipper) {
      this.name = this.shipper.name
      this.phoneNumber = this.shipper.phoneNumber
      this.email = this.shipper.email
      this.vehicle = this.shipper.vehicle
      this.password = this.shipper.password
      this.numberOfVehicle = this.shipper.numberOfVehicle
      this.gender = this.shipper.gender
    }
  }
  add() {
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let checkNumberPhone = regexPhoneNumber.test(this.phoneNumber)
    let checkEmail = regexEmail.test(this.email);
    let lengthPassword = this.password.length
    if (checkNumberPhone && checkEmail && lengthPassword >= 6 && lengthPassword <= 50) {
      const form_data = {
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        password: this.password,
        vehicle: this.vehicle,
        numberOfVehicle: this.numberOfVehicle,
        gender: this.gender
      };
      if (this.name === "" || this.phoneNumber === "" || this.email === "" || this.password === ""
        || this.vehicle === "" || this.numberOfVehicle === "" || this.gender === "") {
        this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
      }
      else {
        this.shipperService.addShipper(form_data).subscribe((result) => {
          if (result.success === true) {
            this.ToastrService.showToastSuccess("Thêm shipper thành công")
          }
          if (result['error']) {
            this.ToastrService.showToastFail("Thêm shipper thất bại")
          }
          this.closeDialog("addShipper");

        });
      }
    }
    else {
      this.ToastrService.showToastWarning("Nhập sai định dạng")
    }
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result })
  }
  update() {
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let checkNumberPhone = regexPhoneNumber.test(this.phoneNumber)
    let checkEmail = regexEmail.test(this.email);
    if (checkNumberPhone && checkEmail ) {
      const form_data = {
        shipperId: this.shipper._id,
        name: this.name,
        phoneNumber: this.phoneNumber,
        email: this.email,
        vehicle: this.vehicle,
        password: this.password,
        numberOfVehicle: this.numberOfVehicle,
        gender: this.gender
      }
      this.shipperService.updateShipper(form_data).subscribe(result => {
        if (result["success"] === true) {
          this.ToastrService.showToastSuccess("Cập nhật thành công");
        }
        if (result["error"]) {
          this.ToastrService.showToastFail("Cập nhật thất bại");
        }
        this.closeDialog("editShipper");
      })
    }
    else{
      this.ToastrService.showToastWarning("Nhập sai định dạng")
    }
  }
}
