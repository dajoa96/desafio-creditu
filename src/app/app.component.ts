import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private readonly userService: UserService,
    private readonly spinner: NgxSpinnerService
  ) {

  }

  ngOnInit() {
    this.userService.checkToken();
  }
}
