import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { ToastrService } from './../../../service/toastr.service';
import { DeliverytimesService } from './../../../service/deliverytimes.service';
import { NbDialogRef } from '@nebular/theme';
import { ShipperService } from './../../../service/shipper.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-editdelivery',
  templateUrl: './editdelivery.component.html',
  styleUrls: ['./editdelivery.component.scss']
})
export class EditdeliveryComponent implements OnInit {
  @Input()
  shipmentDetail;
  @Input()
  status;
  dateShip;
  currentDate;
  shipper;
  listShipper;
  shipmentId;
  shipperId;
  closeResult: string = "";
  constructor(private ShipperService: ShipperService,
    private DeliveryTimesService: DeliverytimesService,
    private ToastrService: ToastrService,
    private dialogRef: NbDialogRef<any>,
    private detectChange: ChangeDetectorRef,
    private modal: NgbModal
  ) { }

  ngOnInit(): void {
    if (this.shipmentDetail) {
      let temp;
      console.log(this.shipmentDetail);
      this.shipmentId = this.shipmentDetail._id
      temp = Date.parse(this.shipmentDetail.dateShip);
      this.currentDate = new Date(temp).toLocaleDateString()
      this.listShipper = [this.shipmentDetail.shipper]
      this.shipper = this.shipmentDetail.shipper
      this.getAllShipper()
    }
  }
  selectShipper(id) {
    this.shipperId = id;
  }
  getAllShipper() {
    this.ShipperService.getAllShipper().subscribe(result => {
      this.listShipper = result.shipperDocument
    })
  }
  update() {
    const form_data = {
      shipmentId: this.shipmentId,
      dateShip: this.dateShip,
      shipper: this.shipperId
    }
    this.DeliveryTimesService.updateShipment(form_data).subscribe(result => {
      console.log(result);

      if (!result['error']) {
        this.ToastrService.showToastSuccess("Cập nhật thành công")
      }
      if (result['error']) {
        this.ToastrService.showToastFail("Cập nhật thất bại")
      }
      this.closeDialog("editShipment");
    })
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result })
  }
  openModal(content: ElementRef) {
    
    this.modal.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.delete();

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  delete() {
    if (this.shipmentDetail.status === 3) {
      this.DeliveryTimesService.deleteShipment({ shipmentId: this.shipmentDetail._id }).subscribe(result => {
        if (!result["error"]) {
          this.ToastrService.showToastSuccess("Xóa lượt giao hàng thành công")
        }
        if (result["error"]) {
          this.ToastrService.showToastFail("Xóa lượt giao hàng thất bại")
        }
      })
    } else {
      this.ToastrService.showToastWarning("Không thể xóa lượt giao hàng này")
    }
    this.closeDialog("deleteShipment");
  }
}
