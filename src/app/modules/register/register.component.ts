import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, throwError } from 'rxjs';
import { RegisterRequestModel } from 'src/app/models/user-requests.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly spinner: NgxSpinnerService,
    private readonly router: Router,
    private readonly notifierService: NotifierService
  ) {
    this.registerForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
        [this.userService.validateEmail.bind(this.userService)]
      ],
      nickname: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(32)],
        [this.userService.validateNickname.bind(this.userService)]
      ],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      repeatPassword: ['', [Validators.required]]
    },
    {
      validator: MustMatch('password', 'repeatPassword')    //this validator is separated due to beign more rehusable, as it can be used with any form controls
    }
    );
  }

  ngOnInit(): void {
  }

  //Helper to access the form's controls
  get fc(): any {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    //We confirm the user has tried to submit the form
    this.isSubmitted = true;
    //Only if the form is valid, we submit
    if (this.registerForm.valid) {
      const data: RegisterRequestModel = {
        email: this.registerForm.get('email')?.value,
        nickname: this.registerForm.get('nickname')?.value,
        password: this.registerForm.get('password')?.value
      }
      this.spinner.show();
      this.authService.signUp(data).pipe(first()).subscribe({
        next: (res) => {
          try {
            if (res.status.toLowerCase() != 'success') {
              if (res.error == "duplicated-email") throw new Error("Email is already taken");
              if (res.error == "duplicated-email") throw new Error("Nickname is already taken");
              throw new Error("An unknown error has ocurred, please try again");
            } else {
              this.notifierService.notify('success', 'You have successfully Signed Up, please Login to access Kraken Race!');
              this.router.navigate(['/login']);
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
