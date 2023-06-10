import { ShipperService } from './../../service/shipper.service';
import { Router, NavigationExtras } from '@angular/router';
import { EditdeliveryComponent } from './editdelivery/editdelivery.component';
import { ToastrService } from "./../../service/toastr.service";
import { DeliverytimesService } from "./../../service/deliverytimes.service";
import { AdddeliverTimesComponent } from "./adddeliver-times/adddeliver-times.component";
import { NbDialogService } from "@nebular/theme";
import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';



export interface DeliveryTime {
  _id: string;
  dateShip: string;
  warehouse: string;
  order: string;
  totalCOD: number;
  totalSuccess: number;
  totalFail: number;
  mDate: string;
  status: number;
}

@Component({
  selector: "ngx-deliver-times",
  templateUrl: "./deliver-times.component.html",
  styleUrls: ["./deliver-times.component.scss"],
})
export class DeliverTimesComponent implements OnInit {
  listShipment: MatTableDataSource<DeliveryTime> = new MatTableDataSource();
  displayedColumns: string[] = [
    "shipper",
    "dateship",
    "countorder",
    "countsuccess",
    "countfail",
    "status",
    "totalCOD",
    "mdate",
    "employee",
    "edit",
    "dashboard",
  ];
  shipmentDetail;
  currentDate = new Date().toLocaleDateString();
  fromDate;
  toDate;
  shipper;
  listShipper;
  listShipment_temp;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialogService: NbDialogService,
    private DeliverytimesService: DeliverytimesService,
    private ToastrService: ToastrService,
    private router: Router,
    private ShipperService: ShipperService
  ) { }

  ngOnInit(): void {
    this.get();
    this.getAllShipper();
  }
  ngAfterViewInit() {
    this.listShipment.paginator = this.paginator;
  }
  open() {
    this.dialogService
      .open(AdddeliverTimesComponent, {
        context: {},
      })
      .onClose.subscribe((result) => {
        if (result["result"] === "addShipment") {
          this.get();
        }
      });
  }
  get() {
    this.DeliverytimesService.getAllShipment().subscribe((result) => {
      this.listShipment = new MatTableDataSource<DeliveryTime>(result.shipmentDocument);
      this.listShipment.paginator = this.paginator;
    });
  }
  editDelivery(id) {
    this.DeliverytimesService.getShipmentById(id).subscribe(result => {
      this.shipmentDetail = result.shipmentDocument
      const dialogRef = this.dialogService.open(EditdeliveryComponent, {
        context: {
          shipmentDetail: this.shipmentDetail,
          status: "update"
        },

      }).onClose.subscribe((result) => {
        if (result.result === "editShipment") {
          this.get()
        }
        if (result.result === "deleteShipment") {
          this.get()
        }
      });
    })
  }
  followShipment(item) {
    console.log(item);

    const navigationExtras: NavigationExtras = {
      state: {
        transd: 'TRANS001',
        workQueue: false,
        services: 10,
        code: '003'
      }
    };
    this.router.navigate(['DashboardComponent'], navigationExtras);
  }
  searchShipment() {
    if ( !this.toDate && this.fromDate || !this.fromDate && this.toDate ){
      this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
    }
    else{
      const form_data = {
        shipperId: this.shipper,
        fromDate: new Date(this.fromDate),
        toDate: new Date(this.toDate)
  
      }
      this.listShipment_temp= [];
      this.DeliverytimesService.getShipmentByShipperOrDate(form_data).subscribe(result =>{
        console.log(result.listReport);
        
        for (let i = 0; i < result.listReport.length; i++) {
          for (let index = 0; index < result.listReport[i].listShipment.length; index++) {
            const element =  result.listReport[i].listShipment[index]
            this.listShipment_temp.push(element);
          }
        }
        this.listShipment = new MatTableDataSource<DeliveryTime>(this.listShipment_temp);
        this.listShipment.paginator = this.paginator;
      })
      this.toDate = undefined;
      this.fromDate = undefined;
    }
    
  }
  getAllShipper(){
    this.ShipperService.getAllShipper().subscribe(result =>{
      this.listShipper = result.shipperDocument
    })
  }

}
