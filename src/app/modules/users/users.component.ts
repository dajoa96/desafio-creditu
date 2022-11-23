import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginRequestModel } from 'src/app/models/user-requests.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly userService: UserService,     //Only for Testing
    private readonly router: Router,               //Only for Testing
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      nickname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.minLength(4), Validators.maxLength(32)]],
      repeatPassword: ['', []]
    },
    {
      validator: MustMatch('password', 'repeatPassword')    //this validator is separated due to beign more rehusable, as it can be used with any form controls
    }
    );
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
      console.log(this.loginForm.value);
      const data: LoginRequestModel = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.authService.login(data).pipe(first()).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          switch(err.status) {
            case 404:
              this.errorMessage = 'The User/Password is incorret'
            break;
            default:
              this.errorMessage = 'An error has ocurred'
            break;
          }
       }
      });
      this.userService.setToken(JSON.stringify(this.loginForm.value));         //Only for Testing
      if (this.userService.checkToken()) this.router.navigate(['/home'])       //Only for Testing
    }
  }

}
