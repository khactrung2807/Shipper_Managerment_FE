import { ToastrService } from './../../../service/toastr.service';
import { NbDialogRef } from '@nebular/theme';
import { EmployeeService } from './../../../service/employee.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss']
})
export class AddemployeeComponent implements OnInit {
  name: string = "";
  email: string = "";
  phoneNumber = "";
  password = "";
  gender = "";
  position = "";
  @Input()
  employee;

  @Input()
  status;
  constructor(private employeeService: EmployeeService, private dialogRef: NbDialogRef<any>,
    private ToastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.employee) {
      this.name = this.employee.name
      this.phoneNumber = this.employee.phoneNumber
      this.email = this.employee.email
      this.password = this.employee.password
      this.gender = this.employee.gender
      this.position = this.employee.position
    }
  }
  add() {
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let checkNumberPhone = regexPhoneNumber.test(this.phoneNumber)
    let checkEmail = regexEmail.test(this.email);
    let lengthPassword = this.password.length
    if (checkNumberPhone && checkEmail && lengthPassword >= 6 && lengthPassword <= 50) {
      const form_data = {
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        gender: this.gender,
        position: this.position
      }
      if (this.name === "" || this.email === "" || this.phoneNumber === ""
        || this.password === "" || this.gender === "" || this.position === "") {
        this.ToastrService.showToastWarning("Vui lòng nhập đầy đủ thông tin")
      }
      else {
        this.employeeService.addEmployee(form_data).subscribe((result) => {
          if (result.success === true) {
            this.ToastrService.showToastSuccess("Thêm nhân viên thành công")
          }
          if (result['error']) {
            this.ToastrService.showToastFail("Thêm nhân viên thất bại")
          }
          this.closeDialog("addEmployee");
        });
      }

    } else {
      this.ToastrService.showToastWarning("Nhập sai định dạng")
    }


  }
  closeDialog(result) {
    this.dialogRef.close({ result: result })
  }

  update() {
    const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    let checkNumberPhone = regexPhoneNumber.test(this.phoneNumber)
    let checkEmail = regexEmail.test(this.email);
    if (checkNumberPhone && checkEmail) {
      const form_data = {
        employeeId: this.employee._id,
        name: this.name,
        email: this.email,
        phoneNumber: this.phoneNumber,
        password: this.password,
        gender: this.gender,
        position: this.position
      }
      this.employeeService.updateEmployee(form_data).subscribe(result => {
        console.log(result);

        if (result["success"] === true) {
          this.ToastrService.showToastSuccess("Cập nhật nhân viên thành công")
        }
        if (result["error"]) {
          this.ToastrService.showToastFail("Cập nhật nhân viên thất bại")
        }
        this.closeDialog("editEmployee")
      })
    }
    else{
      this.ToastrService.showToastWarning("Nhập sai định dạng")
    }
  }
}
