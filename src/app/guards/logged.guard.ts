import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const resp = this.userService.checkToken() ? true : false;
    if (resp) {
      console.log('YA ESTA LOGUEADO, POR FAVOR CERRAR SESION PRIMERO'); //Only For Testing
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
