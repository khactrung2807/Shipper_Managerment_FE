import { ToastrService } from './../../service/toastr.service';
import { WarehouseService } from "./../../service/warehouse.service";
import { AddwarehouseComponent } from "./addwarehouse/addwarehouse.component";
import { NbDialogService, NbToastRef } from "@nebular/theme";
import { MatTableDataSource } from "@angular/material/table";
import {
  Component,
  ElementRef,
  OnInit,
} from "@angular/core";
import {
  ModalDismissReasons,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

export interface Warehouse {
  _id: string;
  name: string;
  phoneNumber: string;
  address: string;
  ward: string;
  district: string;
  province: string;
  cDate: string;
}

@Component({
  selector: "ngx-warehouse",
  templateUrl: "./warehouse.component.html",
  styleUrls: ["./warehouse.component.scss"],
})
export class WarehouseComponent implements OnInit {
  listWarehouse: MatTableDataSource<Warehouse> = new MatTableDataSource();
  displayedColumns: string[] = [
    "name",
    "phonenumber",
    "address",
    "cdate",
    "edit",
    "delete",
  ];
  searchPhoneNumber;
  warehouseId: string = "";
  closeResult = "";
  name = "";
  address = "";
  warehouse;
  constructor(
    private dialogService: NbDialogService,
    private warehouseService: WarehouseService,
    private modal: NgbModal,
    private ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.get();
    // this.getGeocoding()
  }
  open() {
    this.dialogService
      .open(AddwarehouseComponent, {
        context: {},
      })
      .onClose.subscribe((result) => {
        if (result.result === "addWarehouse") {
          this.get();
        }
      });
  }
  get() {
    this.warehouseService.getAllWarehouse().subscribe((result) => {
      this.listWarehouse = result.warehouseDocument;
    });
  }

  openModal(content: ElementRef, id) {
    this.warehouseId = id;
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
  delete() {
    this.warehouseService
      .deleteWarehouse({ warehouseId: this.warehouseId })
      .subscribe((result) => {
        if (result.success === true) {
          this.ToastrService.showToastSuccess("Xóa kho thành công")
        }
        this.get()
      });
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

  getWarehouseById(id) {
    this.warehouseService.getWarehouseById(id).subscribe((result) => {
      this.warehouse = result.warehouse
      console.log(result);
      const dialogRef = this.dialogService.open(AddwarehouseComponent, {
        context: {
          warehouse: this.warehouse,
          status: "update"
        },

      }).onClose.subscribe((result) => {

        if (result.result === "editWarehouse") {
          this.get()
        }
      });
    })
  }
  searchWarehouse() {
    this.warehouseService.getWarehouseByPhoneNumber(this.searchPhoneNumber).subscribe(result => {
     
      if (result.warehouseDocument) {
        let list_temp;
        list_temp = [result["warehouseDocument"]]
        this.listWarehouse = list_temp
      }
      if (!result.warehouseDocument) {
        this.ToastrService.showToastWarning("Không tìm thấy kho")
      }
    })
  }
  onSearch(event: any) {
    if (!event.target.value) {
      this.get()
    }
  }
}
