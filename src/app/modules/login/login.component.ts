import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { LoginRequestModel } from 'src/app/models/user-requests.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
    });
  }

  ngOnInit(): void {
  }

  get fc(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    //We reset the error message
    this.errorMessage = '';
    //We confirm the user has tried to submit the form
    this.isSubmitted = true;
    //Only if the form is valid, we submit
    if (this.loginForm.valid) {
      this.spinner.show();
      this.authService.login(this.loginForm.value).pipe(first()).subscribe({
        next: (res) => {
          try {
            if (res.status.toLowerCase() != 'success') {
              if (res.error == "invalid-email" || res.error == "invalid-password") throw new Error("Invalid Email and/or Password");
              throw new Error("An unknown error has ocurred, please try again");
            } else {
              if (!res.data.token || res.data.token === '') throw new Error("An error has ocurred, please try again");
              if (!this.userService.setToken(res.data.token) || !this.userService.checkToken()) throw new Error("An error has ocurred, please try again");
              this.router.navigate(['/users']);
              this.spinner.hide();
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
