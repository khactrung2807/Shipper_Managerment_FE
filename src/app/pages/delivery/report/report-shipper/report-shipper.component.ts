import { ToastrService } from './../../../service/toastr.service';
import { ShipperService } from './../../../service/shipper.service';
import { ReportService } from './../../../service/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';


export interface Shipper {
  _id: string;
  name: string;
  listShipment: [];
  countSuccess;
  countFail;
  countTotal;
  totalFee;
  totalCOD;
}
@Component({
  selector: 'ngx-report-shipper',
  templateUrl: './report-shipper.component.html',
  styleUrls: ['./report-shipper.component.scss']
})
export class ReportShipperComponent implements OnInit {
  listReport: MatTableDataSource<Shipper> = new MatTableDataSource();
  displayedColumns: String[] = ["shipper", "shipment", "order", "success", "fail", "cod", "fee"]
  fromDate: string = "";
  currentDate = new Date().toLocaleDateString()
  toDate: string = "";
  listShipper = [];
  shipper = "";
  constructor(private ReportService: ReportService,
    private ShipperService: ShipperService,
    private ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllShipper()
    this.get()
  }
  get() {
    this.ReportService.getAllReportShipper().subscribe((result) => {
      this.listReport = result["listReport"]

    })
  }
  getAllShipper() {
    this.ShipperService.getAllShipper().subscribe((result) => {
      this.listShipper = result["shipperDocument"]
    })
  }
  getReportByShipperId() {
    if (!this.fromDate && this.toDate || !this.toDate && this.fromDate) {
      this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
    }
   
    
    else {
      const form_data = {
        shipperId: this.shipper,
        fromDate: new Date(this.fromDate),
        toDate: new Date(this.toDate)
      }
      this.ReportService.getReportByShipperId(form_data).subscribe((result) => {
        console.log(result);
        this.listReport = result["listReport"]
        this.toDate = undefined;
        this.fromDate = undefined
      })

    }

  }
}
