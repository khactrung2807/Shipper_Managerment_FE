import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from './../../service/toastr.service';
import { ShipperService } from './../../service/shipper.service';
import { AddshipperComponent } from './addshipper/addshipper.component';
import { NbDialogService } from "@nebular/theme";
import { MatTableDataSource } from "@angular/material/table";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Shipper {
  name: string;
  phoneNumber: string;
  password: string;
  email: string;
  vehicle: string;
  numberOfVehicle: string;
  gender: string;
  status: number;
}


@Component({
  selector: "ngx-shipper",
  templateUrl: "./shipper.component.html",
  styleUrls: ["./shipper.component.scss"],
})
export class ShipperComponent implements OnInit {
  listShipper: MatTableDataSource<Shipper>;
  displayedColumns: string[] = ["name", "phonenumber", "email", "status", "vehicle", "numberofvehicle", "gender", "edit", "delete"];
  constructor(private dialogService: NbDialogService,
    private shipperService: ShipperService,
    private modal: NgbModal,
    private ToastrService: ToastrService) { }
  shipperId: string = "";
  closeResult: string = "";
  shipper;
  searchPhoneNumber;
  searchEmail;
  temp_shipper;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  
  ngOnInit(): void {
    this.get()
  }
  ngAfterViewInit() {
    this.listShipper.paginator = this.paginator;
  }
  open() {
    this.dialogService.open(AddshipperComponent, {
      context: {},
    }).onClose.subscribe((result) => {
      console.log(result);
      if (result.result === "addShipper") {
        this.get();
      }
    });
  }
  getOrderDetailById(id) {
    this.shipperService.getShipperById(id).subscribe((result) => {
      this.shipper = result.shipperDocument
      const dialogRef = this.dialogService.open(AddshipperComponent, {
        context: {
          shipper: this.shipper,
          status: "update"
        },

      }).onClose.subscribe((result) => {
        console.log(result);

        if (result.result === "editShipper") {
          this.get()
        }
      });
    })
  }

  get() {
    this.shipperService.getAllShipper().subscribe((result) => {
      this.listShipper = new MatTableDataSource<Shipper>(result["shipperDocument"])
      this.listShipper.paginator = this.paginator;
    });
  }
  delete() {
    this.shipperService.deleteShipper({ shipperId: this.shipperId }).subscribe((result) => {
      if (result.success === true) {
        this.ToastrService.showToastSuccess("Xóa shipper thành công")
      }
      this.get();

    })
  }
  openModal(content: ElementRef, id) {
    this.shipperId = id;
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
  searchShipper() {
    const form_data = {
      phoneNumber: this.searchPhoneNumber,
      email: this.searchEmail
    }
    this.shipperService.getShipperByEmailOrPhone(form_data).subscribe(result => {
      if (result.shipperDocument) {
        this.listShipper = new MatTableDataSource<Shipper>([result.shipperDocument])
        this.listShipper.paginator = this.paginator
      }
      if (!result.shipperDocument) {
        this.ToastrService.showToastWarning("Không tìm thấy shipper")
      }
    })
  }
  onSearchCustomer(event: any) {
    if (!event.target.value) {
      this.get()
    }
  }
}
