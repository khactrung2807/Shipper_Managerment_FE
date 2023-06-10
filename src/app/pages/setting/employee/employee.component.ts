import { ToastrService } from './../../service/toastr.service';
import { NbDialogService } from "@nebular/theme";
import { MatTableDataSource } from "@angular/material/table";
import { EmployeeService } from "./../../service/employee.service";
import { Component, ElementRef, OnInit } from "@angular/core";
import { AddemployeeComponent } from "./addemployee/addemployee.component";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";

export interface Employee {
  name: string;
  phoneNumber: string;
  password: string;
  email: string;
  position: string;
  gender: string;
  role: number;
}
@Component({
  selector: "ngx-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.scss"],
})
export class EmployeeComponent implements OnInit {
  listEmployee: MatTableDataSource<Employee> = new MatTableDataSource();
  constructor(
    private EmployeeService: EmployeeService,
    private dialogService: NbDialogService,
    private modal: NgbModal,
    private ToastrService: ToastrService
  ) { }
  displayedColumns: string[] = [
    "name",
    "email",
    "phonenumber",
    "gender",
    "position",
    "edit",
    "delete"
  ];
  employeeId: string = "";
  closeResult: string = "";
  employee;
  searchPhoneNumber: string = "";
  searchEmail: string = "";
  temp_employee;
  ngOnInit(): void {
    this.get();
  }
  open() {
    this.dialogService.open(AddemployeeComponent, {
      context: {},
    }).onClose.subscribe((result) => {
      if (result.result === "addEmployee") {
        this.get()
      }
    });
  }
  get() {
    this.EmployeeService.getAllEmployee().subscribe((result) => {
      console.log(result);
      this.listEmployee = result.employeeDocument;
    });
  }
  delete() {
    this.EmployeeService.deleteEmployee({ employeeId: this.employeeId }).subscribe((result) => {
      if (result.success === true){
        this.ToastrService.showToastSuccess("Xóa nhân viên thành công")
      }
      this.get();
    })
  }
  openModal(content: ElementRef, id) {
    this.employeeId = id;
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

  getEmployeeById(id){
    this.EmployeeService.getEmployeeById(id).subscribe((result)=>{
      this.employee = result.employee
      console.log(result);      
      const dialogRef = this.dialogService.open(AddemployeeComponent, {
        context: {
          employee: this.employee,
          status: "update"
        },
        
      }).onClose.subscribe((result) => {
        
        if (result.result === "editEmployee") {
          this.get()
        }
      });
    })
  }
  searchEmployee() {
    const form_data = {
      phoneNumber: this.searchPhoneNumber,
      email: this.searchEmail
    }
    this.EmployeeService.getEmployeeByEmailOrPhone(form_data).subscribe(result => {
      if (result.employeeDocument) {
        this.temp_employee = [result.employeeDocument]
        this.listEmployee = this.temp_employee
      }
      if(!result.employeeDocument){
        this.ToastrService.showToastWarning("Không tìm thấy nhân viên")
      }
    })
  }
  onSearchCustomer(event: any) {
    if (!event.target.value){
      this.get()
    }
 }
}

