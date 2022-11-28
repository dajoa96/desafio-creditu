import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  sendEmailForm: FormGroup;
  resetPasswordForm: FormGroup;
  tokenIsExpired: boolean = false;
  isSubmitted: boolean = false;
  isSent: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  token?: any | null;
  decodedToken?: any | null;
  errorMessage?: string;
  paramsSub$?: Subscription;
  params?: ParamMap;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly jwtHelper: JwtHelperService,
    private readonly spinner: NgxSpinnerService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {
    this.sendEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]]
    });
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      repeatPassword: ['', [Validators.required]]
    },
    {
      validator: MustMatch('password', 'repeatPassword')    //this validator is separated due to beign more rehusable, as it can be used with any form controls
    });
  }

  get fc(): any {
    return this.sendEmailForm.controls;
  }

  get rfc(): any {
    return this.resetPasswordForm.controls;
  }

  ngOnInit(): void {
    try {
      this.tokenIsExpired = false;
      this.token = this.route.snapshot.queryParamMap.get('token');
      if (this.token && this.token != "" && this.jwtHelper.isTokenExpired(this.token)) {
        this.tokenIsExpired = true;
        this.errorMessage = "The recovery token has expired";
        this.isSent = false;
      }
      this.decodedToken = this.jwtHelper.decodeToken(this.token);
      console.log(this.decodedToken);
    } catch (error) {
      this.token = undefined;
      this.errorMessage = "Invalid recovery token, please re-send the recovery email";
    }
  }

  onSendEmail() {
    this.isSubmitted = true;
    this.errorMessage = "";
    if (this.sendEmailForm.valid) {
      this.spinner.show();
      this.authService.recoveryPassword(this.sendEmailForm.value).pipe(first()).subscribe({
        next: (res) => {
          try {
            if (res.status.toLowerCase() != 'success') {
              if (res.error == "invalid-email") throw new Error("Invalid Email");
              throw new Error("An unknown error has ocurred, please try again");
            } else {
              this.spinner.hide();
              this.isSent = true;
            }
          } catch (error: any) {
            this.errorHandler(error.message || error);
          }
        },
        error: (err) => {
          this.errorHandler();
        }
      });
    }
  }

  onResetPassword() {
    this.isSubmitted = true;
    this.errorMessage = "";
    if (this.resetPasswordForm.valid) {
      this.spinner.show();
      const fd: any = new FormData();
      if (this.decodedToken && this.decodedToken?._id && this.decodedToken !== '') fd.append('_id', this.decodedToken?._id);
      if (this.resetPasswordForm.get('password')?.value && this.resetPasswordForm.get('password')?.value !== '') fd.append('password', this.resetPasswordForm.get('password')?.value);
      console.log(this.token);
      console.log(Object.fromEntries(fd));
      this.authService.updatePassword(this.token, fd).pipe(first()).subscribe({
        next: (res: any) => {
          console.log(res);
          try {
            if (res.status.toLowerCase() != 'success') {
              if (res.code === 502) throw new Error("An error has ocurred, password not updated");
              throw new Error("An unknown error has ocurred, password not updated");
            } else {
              this.spinner.hide();
              this.isSent = true;
            }
          } catch (error: any) {
            this.errorHandler(error.message || error);
          }
        },
        error: (err) => {
          this.errorHandler();
        }
      });
    }
  }

  errorHandler(message?: string) {
    this.spinner.hide();
    this.errorMessage = message || "An error has ocurred, please try again";
  }

}
