import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean = false;
  showPassword: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,     //Only for Testing
    private readonly router: Router                //Only for Testing
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      username: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      repeatPassword: ['']
    });
  }

  ngOnInit(): void {
  }

  get fc(): any {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.setToken(JSON.stringify(this.loginForm.value));         //Only for Testing
      if (this.userService.checkToken()) this.router.navigate(['/home'])       //Only for Testing
    }
  }
}
