import { ToastrService } from './../../service/toastr.service';
import { ServiceshippingService } from "./../../service/serviceshipping.service";
import { MatTableDataSource } from "@angular/material/table";
import { AddserviceComponent } from "./addservice/addservice.component";
import { NbDialogService, NbToastrService } from "@nebular/theme";
import { Component, ElementRef, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

export interface Service {
  name: string;
  description: string;
  typeShipping: string;
  fee: [];
}
@Component({
  selector: "ngx-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit {
  listService: MatTableDataSource<Service> = new MatTableDataSource();
  displayedColumns: string[] = [
    "name",
    "description",
    "typeshipping",
    "cdate",
    "edit",
    "delete",
  ];
  serviceShippingId: string = "";
  closeResult = "";
  service;
  constructor(
    private dialogService: NbDialogService,
    private serviceShippingService: ServiceshippingService,
    private modal: NgbModal,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.get()
  }
  open() {
    this.dialogService.open(AddserviceComponent, {
      context: {},
    }).onClose.subscribe((result) => {
      if (result.result === "addServiceShipping") {
        this.get()
      }
    });
  }
  get() {
    this.serviceShippingService.getAllServiceShipping().subscribe((result) => {
      this.listService = result.serviceShippingDocument;
    });
  }
  openModal(content: ElementRef, id) {
    this.serviceShippingId = id;
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
    this.serviceShippingService.deleteServiceShipping({ serviceShippingId: this.serviceShippingId }).subscribe((result) => {
      this.get();
      if (result.success === true) {
        this.toastrService.showToastSuccess("Xóa dịch vụ thành công")
      }
      if (result.success === false) {
        this.toastrService.showToastFail("Xóa dịch vụ thất bại")
      }
    })
  } 
  getServiceById(id){
    this.serviceShippingService.getServiceShippingById(id).subscribe(result =>{
      this.service = result.serviceShipping
      console.log(result);      
      const dialogRef = this.dialogService.open(AddserviceComponent, {
        context: {
          service: this.service,
          status: "update"
        },
        
      }).onClose.subscribe((result) => {
        
        if (result.result === "editService") {
          this.get()
        }
      });
    })
  }
}
