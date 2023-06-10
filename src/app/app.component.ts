import { ToastrService } from './pages/service/toastr.service';
import { Router } from '@angular/router';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import jwt_decode from "jwt-decode"
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private seoService: SeoService, private router: Router, private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.getToken();
  }
  getToken() {
    var token = localStorage.getItem('token');
    var decoded = jwt_decode(token)
    var time = new Date().getTime()

    if (time / 1000 <= decoded["exp"]) {
      this.router.navigate(['./pages/'])
    }
    else {
      localStorage.clear()
      this.router.navigate(['./authen/login'])
      this.toastrService.showToastFail("Phiên đăng nhập đã hết hạn")
    }

  }
}
