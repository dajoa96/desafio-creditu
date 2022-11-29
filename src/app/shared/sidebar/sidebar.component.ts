import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  host: {
    'class': 'h-100'  //We add a height: 100% class to the component's tag to make sure we use all the height available
  }
})
export class SidebarComponent implements OnInit {
  currentUser?: any;
  isLogged: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly offcanvas: NgbActiveOffcanvas
  ) { }

  ngOnInit(): void {
    this.userService.isLogged$.subscribe(s => this.isLogged = s);
    this.userService.currentUser$.subscribe(s => this.currentUser = s);
  }

  onSignOut() {
    this.userService.clearToken();
    this.router.navigate(['/home']);
  }

  onClose() {
    this.offcanvas.close();
  }

}
