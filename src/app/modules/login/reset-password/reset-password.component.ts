import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
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
  submitted: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  token?: any | null;
  errorMessage?: string;
  paramsSub$?: Subscription;
  params?: ParamMap;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly jwtHelper: JwtHelperService,
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
      }
    } catch (error) {
      this.token = undefined;
      this.errorMessage = "Invalid recovery token, please re-send the recovery email";
    }
  }

  onSendEmail() {
    this.isSubmitted = true;
  }

  onResetPassword() {
    this.isSubmitted = true;
  }

}
