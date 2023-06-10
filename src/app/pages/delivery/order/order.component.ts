import { EmployeeService } from './../../service/employee.service';
import { ToastrService } from './../../service/toastr.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from './../../service/order.service';

import { AddorderComponent } from './addorder/addorder.component';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbDialogService } from '@nebular/theme';
import { MatPaginator } from '@angular/material/paginator';

export interface Order {
  _id: string;
  serviceShipping: string;
  warehouse: string;
  order: string;
}

@Component({
  selector: 'ngx-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  listOrder: MatTableDataSource<Order>;
  displayedColumns: string[] = ['servicename', 'datestarted', 'warehouse', 'orderaddress', 'distance', 'cod', 'fee', 'status', 'cdate', 'employee', 'mdate', 'edit', 'cancel'];
  constructor(private dialogService: NbDialogService, private orderService: OrderService,
    private EmployeeService: EmployeeService,
    private modal: NgbModal, private ToastrService: ToastrService) { }
  orderDetail;
  orderId = "";
  order;
  employee;
  listEmployee = [];
  toDate: string = "";
  fromDate: string = "";
  currentDate = new Date().toLocaleDateString()
  closeResult: string = "";
  ngOnInit(): void {
    this.get()
    this.getAllEmployee()
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.listOrder.paginator = this.paginator;
  }
  open() {
    this.dialogService.open(AddorderComponent, {
      context: {},
    }).onClose.subscribe((result) => {
      if (result.result === "addOrder") {
        this.get()
      }
    });
  }
  edit(id) {
    this.getOrderDetailById(id)
  }
  get() {
    this.orderService.getAllOrderDetail().subscribe((result) => {
      this.listOrder = new MatTableDataSource<Order>(result.orderDetailDocument);
      this.listOrder.paginator = this.paginator;
      console.log(this.listOrder);

    })
  }
  getOrderDetailById(id) {
    this.orderService.getOrderDetailById(id).subscribe((result) => {
      this.orderDetail = result.orderDetailDocument
      const dialogRef = this.dialogService.open(AddorderComponent, {
        context: {
          orderdetail: this.orderDetail,
          status: "update"
        },

      }).onClose.subscribe((result) => {
        if (result.result === "editOrder") {
          this.get()
        }
      });
    })
  }

  openModal(content: ElementRef, item) {
    this.orderId = item;
    this.order = item;
    this.modal.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
        this.cancelOrder();

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
  cancelOrder() {
    if (this.order.order.status === 1 || this.order.order.status === 3) {

      this.orderService.cancelOrder(this.orderId).subscribe((result) => {
        if (!result["error"]) {
          this.ToastrService.showToastSuccess("Hủy đơn hàng thành công")
          this.get()
        }
        else {
          this.ToastrService.showToastFail("Không thể hủy đơn hàng này")
        }
      })
    }else{
      this.ToastrService.showToastFail("Không thể hủy đơn hàng này")
    }
  }
  getAllEmployee() {
    this.EmployeeService.getAllEmployee().subscribe((result) => {

      this.listEmployee = result["employeeDocument"]

    })
  }
  getOrderByEmployee() {
    const form_data = {
      employeeId: this.employee,
      fromDate: new Date(this.fromDate),
      toDate: new Date(this.toDate)
    }
    this.orderService.getOrderByEmployee(form_data).subscribe(result => {
      this.listOrder = new MatTableDataSource<Order>(result["orderDetailDocument"])
      this.listOrder.paginator = this.paginator
      this.fromDate = null;
      this.toDate = null;
    })
  }

}
