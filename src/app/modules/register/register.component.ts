import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch } from 'src/app/shared/validators/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;
  showRepeatPassword: boolean = false;
  errorMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,     //Only for Testing
    private readonly router: Router                //Only for Testing
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      nickname: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
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
    return this.loginForm.controls;
  }

  onSubmit(): void {
    //We confirm the user has tried to submit the form
    this.isSubmitted = true;
    //Only if the form is valid, we submit
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.setToken(JSON.stringify(this.loginForm.value));         //Only for Testing
      if (this.userService.checkToken()) this.router.navigate(['/home'])       //Only for Testing
    }
  }
}
