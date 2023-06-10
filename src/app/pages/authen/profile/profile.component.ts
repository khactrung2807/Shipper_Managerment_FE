import { ToastrService } from './../../service/toastr.service';
import jwt_decode from 'jwt-decode';
import { PublicService } from './../../service/public.service';
import { Component, OnInit } from '@angular/core';
import { NgModel, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

export function forbiddenpassword(c: AbstractControl) {
  const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
  const regex = re.test(String(c.value).toLowerCase());
  return regex
    ? {
      invalidPassword: true,
    }
    : null;
}
export function passwordSame(passwordOld: string, passwordNew: string) {
  return passwordOld === passwordNew
    ? {
      samePassword: true,
    }
    : null;
}

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private ToastrService: ToastrService,
    private PublicService: PublicService,
    private fb: FormBuilder) { }
  user;
  token;
  userId;
  oldPassword: NgModel;
  newPassword: NgModel;
  repeatPassword: NgModel;
  changePasswordForm: FormGroup;
  submitted: boolean;
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    var decoded = jwt_decode(this.token);
    this.userId = decoded["id"];
    this.get()
    this.changePasswordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
        repeatPassword: [
          '',
          [Validators.required, Validators.minLength(6), Validators.maxLength(50), passwordSame],
        ],
      },
      { validator: this.checkPasswords },
    );

  }
  get() {
    this.PublicService.getUser(this.userId).subscribe(result => {
      this.user = result["userDocument"]
    })
  }
  updatePassword() {
    
  }
  getError(element: string, name: string) {
    return this.changePasswordForm.get(element).getError(name);
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    const pass = group.get('newPassword').value;
    const confirmPass = group.get('repeatPassword').value;

    return pass !== confirmPass ? { passwordNotSame: true } : null;
  }

  activeChangePassword() {
  
    
    if (this.changePasswordForm.valid) {
      this.submitted = true;
      console.log(this.changePasswordForm.get('oldPassword').value);
      const form_data = {
        userId: this.userId,
        oldPassword: this.changePasswordForm.get('oldPassword').value,
        newPassword: this.changePasswordForm.get('newPassword').value
      }
      this.PublicService.updatePassword(form_data).subscribe(result => {
        this.submitted = false;
        if (!result["error"]) {
          this.changePasswordForm.reset();
          this.ToastrService.showToastSuccess("Cập nhật mật khẩu thành công")
        }
        if (result["error"]) {
          this.ToastrService.showToastFail("Cập nhật mật khẩu thất bại")
        }
      })
    }
  }
}
