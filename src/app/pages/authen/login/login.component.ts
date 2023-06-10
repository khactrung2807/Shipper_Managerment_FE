import { ToastrService } from './../../service/toastr.service';
import { PublicService } from './../../service/public.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String = "";
  password: String = "";
  token;
  constructor(private router: Router, private PublicService: PublicService, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    if (this.token){
      this.router.navigate(['./pages/'])
    }
  }

  login() {
    const form_data = {
      email: this.email,
      password: this.password
    }

    this.PublicService.login(form_data).subscribe(result => {
      if (!result['error']) {
        if (result["role"] === 0 || result["role"] === 2) {
          this.toastService.showToastSuccess("Đăng nhập thành công")
          localStorage.setItem('token', result['token']);
          localStorage.setItem('email', result['userName']);
          this.router.navigate(['./pages/delivery/dashboard/dashboard.component.html'])
        }
        else{
          this.toastService.showToastFail("Tài khoản không có quyền đăng nhập")
        }
      } else {
        this.toastService.showToastFail("Sai tài khoản hoặc mật khẩu")
      }
    })
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['./auth'])
  }
}

