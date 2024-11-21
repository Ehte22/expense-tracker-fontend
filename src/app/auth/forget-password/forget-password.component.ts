import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthStateType } from '../../models/auth';
import { resetPassword, verifyEmail, verifyOTP } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  isEmailVerifiedSuccess: boolean = false
  isOtpVerifiedSuccess: boolean = false
  isLoading: boolean = false

  constructor(
    private store: Store<{ auth: AuthStateType }>
  ) { }

  ngOnInit(): void {
    this.store.select(state => state.auth).subscribe((data) => {
      this.isEmailVerifiedSuccess = data.isEmailVerifiedSuccess
      this.isOtpVerifiedSuccess = data.isOtpVerifiedSuccess
      this.isLoading = data.loading
    })
  }

  onSubmit(form: NgForm) {

    if (form.valid) {
      if (this.isEmailVerifiedSuccess) {
        if (this.isOtpVerifiedSuccess) {
          this.store.dispatch(resetPassword({ resetPassword: form.value }))
        } else {
          const otp = this.transformOtp(form.value);
          this.store.dispatch(verifyOTP({ otp }))
        }
      } else {
        this.store.dispatch(verifyEmail({ email: form.value }))
      }
    } else {
      this.markAllAsTouched(form)
    }
  }

  markAllAsTouched(form: NgForm) {
    Object.keys(form.controls).forEach(field => {
      const control = form.control.get(field);
      if (control) {
        control.markAsTouched({ onlySelf: true });
      }
    });
  }

  transformOtp(otpObj: any): string {
    return `${otpObj.num1}${otpObj.num2}${otpObj.num3}${otpObj.num4}`;
  }


}
