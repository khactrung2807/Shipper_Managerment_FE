import { PublicService } from './../../service/public.service';
import { ToastrService } from './../../service/toastr.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
export function forbiddenEmail(c: AbstractControl) {
  const re = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  const regex = re.test(String(c.value).toLowerCase());
  return !regex
    ? {
      invalidEmail: true,
    }
    : null;
}

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})

export class RequestPasswordComponent implements OnInit {
  submitted: boolean;
  forgotForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService,
    private publicService: PublicService

  ) { }

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, forbiddenEmail]],
    });

  }
  requestPass() {
    if (this.forgotForm.valid && !this.submitted) {
      const email = this.forgotForm.get('email').value;
      this.submitted = true;
      this.publicService.resetPassword({ email: email }).subscribe(result => {
        this.submitted = false;
        console.log(result);
        this.router.navigate(['/']);
        this.forgotForm.get('email').setValue('');

      })

    } else {

    }
  }
}