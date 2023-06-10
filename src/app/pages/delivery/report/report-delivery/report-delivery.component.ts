import { ToastrService } from './../../../service/toastr.service';
import { NbThemeService } from '@nebular/theme';
import { ReportService } from './../../../service/report.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';

export interface Shipment {
  count;
  countTotal;
  totalFee;
  totalCOD;
}
export interface Order {
  countSuccess;
  countFail;
  countTotal;
  totalFee;
  totalCOD;
  countRemain;
}

@Component({
  selector: 'ngx-report-delivery',
  templateUrl: './report-delivery.component.html',
  styleUrls: ['./report-delivery.component.scss']
})

export class ReportDeliveryComponent implements OnInit {
  options: any = {};
  themeSubscription: any;
  currentDate = new Date().toLocaleDateString()
  fromDate;
  toDate;
  listShipment: MatTableDataSource<Shipment> = new MatTableDataSource();
  displayedColumns: string[] = ["totalshipment", "totalorder", "cod", "fee"]
  listOrder: MatTableDataSource<Order> = new MatTableDataSource();
  displayedColumnsOrder: string[] = ["countotal", "countsuccess", "countfail", "countremain", "cod", "fee"]
  constructor(private ReportService: ReportService,
    private theme: NbThemeService,
    private ToastrService: ToastrService) {
  }
  createCharts() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.dangerLight, colors.successLight],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {

          orient: 'vertical',
          left: 'left',
          data: ['Đang giao', 'Thất bại', 'Thành công'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: "Đơn hàng",
            type: 'pie',
            radius: '80%',
            center: ['50%', '50%'],
            data: [
              { value: this.listOrder[0].countRemain, name: 'Đang giao' },
              { value: this.listOrder[0].countFail, name: 'Thất bại' },
              { value: this.listOrder[0].countSuccess, name: 'Thành công' },

            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }
  ngOnInit(): void {
    this.getReportShipment()

  }
  getReportShipment() {
    this.ReportService.getReportShipment().subscribe(result => {
      console.log(result);
      this.listShipment = result["reportDocument"]
      this.listOrder = result["reportOrder"]
      this.createCharts()
    })
  }
  getReportShipmentByFilter() {
    if (!this.fromDate || !this.toDate) {
      this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
    }
    
    else {
      const form_data = {
        fromDate: this.fromDate,
        toDate: this.toDate
      }
      this.ReportService.getReportShipmentByFilter(form_data).subscribe(result => {
        this.listShipment = result["reportDocument"]
        this.listOrder = result["reportOrder"]
        this.createCharts()
        this.fromDate = undefined;
        this.toDate = undefined;
      })
    }

  }

}
