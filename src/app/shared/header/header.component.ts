import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultUserImg: string = '/assets/images/user/user-placeholder.jpg';
  currentUser?: any;
  isLogged: boolean = false;

  constructor(
    private readonly offcanvasService: NgbOffcanvas,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userService.isLogged$.subscribe(s => this.isLogged = s);
    this.userService.currentUser$.subscribe(s => this.currentUser = s);
  }

  openSidebar() {
    this.offcanvasService.open(SidebarComponent);
  }

  onSignOut() {
    this.userService.clearToken();
    this.router.navigate(['/home']);
  }
}
