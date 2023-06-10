import { ToastrService } from './../../../service/toastr.service';

import { NbDialogRef } from '@nebular/theme';
import { ShipperService } from './../../../service/shipper.service';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from './../../../service/order.service';
import { Component, OnInit } from '@angular/core';
import { DeliverytimesService } from '../../../service/deliverytimes.service';

export interface OrderDetail {
  _id: string;
  serviceShipping: string;
  warehouse: string;
  order: string;
}

@Component({
  selector: 'ngx-adddeliver-times',
  templateUrl: './adddeliver-times.component.html',
  styleUrls: ['./adddeliver-times.component.scss']
})
export class AdddeliverTimesComponent implements OnInit {
  listOrder: MatTableDataSource<OrderDetail[]> = new MatTableDataSource([]);
  listOrders = [];
  constructor(private OrderService: OrderService,
    private ShipperService: ShipperService,
    private dialogRef: NbDialogRef<any>,
    private DeliveryTimesService: DeliverytimesService,
    private ToastrService: ToastrService) { }
  listAddOrder = [];
  listOrderId = [];
  dateShip;
  shipperId;
  shipper;
  listShipper = [];
  currentDate = new Date().toLocaleDateString();
  displayedColumns: string[] = ['add', 'servicename', 'datestarted', 'warehouse', 'orderaddress', 'distance', 'cod', 'fee', 'status', 'mdate'];
  ngOnInit(): void {
    this.get()
    this.getAllShipper()
  }
  get() {
    this.OrderService.getAllOrderDetailByStatus().subscribe((result) => {
      this.listOrder = result.orderDetailDocument;
      this.listOrders = result.orderDetailDocument;
    })
  }
  selectOrder($event, item) {
    let temp_array = [];
    let temp_arrayId = [];
    if ($event) {
      this.listOrderId.push(item._id)
      this.listAddOrder.push(item)
    }

    if (!$event) {
      this.listOrderId.forEach(e => {
        if (e !== item._id) temp_arrayId.push(e)
      })

      this.listAddOrder.forEach(e => {
        if (e._id !== item._id) temp_array.push(e)
      })

      this.listOrderId = temp_arrayId;
      this.listAddOrder = temp_array
    }
    console.log(this.listOrderId);
  }

  checkAll($event) {
    if ($event) {
      this.listOrders.forEach(e => {
        this.listOrderId.push(e.order._id)
        this.listAddOrder.push(e.order)
      })
    }
    if (!$event) {
      this.listOrderId = [];
      this.listAddOrder = [];
    }
    console.log(this.listOrderId);
  }
  selectShipper(item) {
    this.shipperId = item;
  }
  getAllShipper() {
    this.ShipperService.getAllShipper().subscribe((result) => {
      this.listShipper = result.shipperDocument;
    })
  }
  closeDialog(result) {
    this.dialogRef.close({ result: result })
  }
  add() {
    
    
    if (this.dateShip && this.shipperId) {
      const form_data = {
        shipperId: this.shipperId,
        listOrderId: this.listOrderId,
        listOrder: this.listAddOrder,
        dateShip: this.dateShip,
      }
      this.DeliveryTimesService.addShipment(form_data).subscribe((result) => {
        if (!result['error']) {
          this.ToastrService.showToastSuccess("Thêm lượt giao hàng thành công")
        }
        if (result['error']) {
          this.ToastrService.showToastFail("Thêm lượt giao hàng thất bại")
        }
        this.closeDialog("addShipment");
      })
    }else if (this.listOrderId.length === 0){
      this.ToastrService.showToastWarning("Vui lòng thêm đơn hàng vào lượt giao hàng")
    }
    else{
      this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
    }
  }

}
