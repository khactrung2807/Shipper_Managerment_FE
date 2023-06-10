import { ToastrService } from './../../../service/toastr.service';
import { ServiceshippingService } from "./../../../service/serviceshipping.service";
import { NbDialogRef } from "@nebular/theme";
import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ngx-addservice",
  templateUrl: "./addservice.component.html",
  styleUrls: ["./addservice.component.scss"],
})
export class AddserviceComponent implements OnInit {
  name = "";
  description = "";
  typeShippingSelected = "distance";
  typeShipping = [
    { label: "Theo khối lượng (gram)", value: "mass" },
    { label: "Theo khoảng cách (kilomet)", value: "distance" },
  ];
  fee = [];
  listInput = [{ from: 0, to: 0, value: 0 }];

  from = 0;
  to = 0;
  price = 0;

  @Input()
  service
  @Input()
  status
  constructor(
    private dialogRef: NbDialogRef<any>,
    private serviceShippingService: ServiceshippingService,
    private ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.service) {
      this.name = this.service.name
      this.description = this.service.description
      this.typeShippingSelected = this.service.typeShipping
      this.listInput = this.service.fee
      console.log(this.listInput);
    }
  }
  add() {
    const form_data = {
      name: this.name,
      description: this.description,
      typeShipping: this.typeShippingSelected,
      fee: this.fee,
    };
    if (this.name === "" || this.typeShippingSelected === "" || this.fee === []) {
      this.ToastrService.showToastFail("Vui lòng nhập đầy đủ thông tin")
    }
    else {
      this.serviceShippingService.addServiceShipping(form_data).subscribe((result) => {

        if (result.success === true) {
          this.ToastrService.showToastSuccess("Thêm dịch vụ thành công")
        }
        if (result['error']) {
          this.ToastrService.showToastFail("Thêm dịch vụ thất bại")
        }
        this.closeDialog("addServiceShipping");
      })
    }
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result });
  }
  addInput() {
    const form_fee = { from: 0, to: 0, value: 0 };
    this.listInput.push(form_fee);
  }

  parseListFee(listFee) {
    listFee.forEach((element, i) => {
      const item = { from: element.from, to: element.to, value: element.value }
      this.listInput.push(item)

    });
  }
  setFee($event, type, index) {
    console.log($event.target.value, type);
    this.listInput.forEach((e, i) => {
      if (i === index) {
        if (type === "from") {
          e.from = Number.parseInt($event.target.value); console.log(e.from);
        }
        if (type === "to") e.to = Number.parseInt($event.target.value);
        if (type === "price") e.value = Number.parseInt($event.target.value);
      }
    });
    this.fee = this.listInput;
  }
  removeFee(index) {
    let temp_array = [];
    this.listInput.forEach((e, i) => {
      if (index !== i) temp_array.push(e)
    })
    this.listInput = temp_array;
    this.fee = this.listInput
  }
  update() {
    const form_data = {
      serviceShippingId: this.service._id,
    }
    this.serviceShippingService.updateServiceShipping(form_data).subscribe(result => {
      if (result["success"] === true) {
        this.ToastrService.showToastSuccess("Cập nhật dịch vụ thành công")
      }
      if (result["error"]) {
        this.ToastrService.showToastFail("Cập nhật dịch vụ thất bại")
      }
      this.closeDialog("editService")
    })
  }

}

