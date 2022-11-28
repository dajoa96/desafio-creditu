import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, first, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InterceptorSkip } from '../shared/interceptor/auth.interceptor';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged$: Observable<boolean> = this.isLogged.asObservable();
  currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  currentUser$: Observable<any> = this.currentUser.asObservable();
  private readonly API_URL: string = environment.api.link;
  private readonly skipAuthInterceptor: HttpHeaders = new HttpHeaders().set(InterceptorSkip, 'skip');

  constructor(
    private readonly authService: AuthService,
    private readonly jwtHelper: JwtHelperService,
    private readonly http: HttpClient,
  ) { }

  //Fires when the user is successfully authenticated
  setToken(token: string): boolean {
    try {
      localStorage.setItem('app-token', token);
      return true;
    } catch (error) {
      this.clearToken();
      return false;
    }
  }

  //Fires when the app is initialized
  checkToken(): boolean {
    try {
      const token = localStorage.getItem('app-token');
      // check if token is valid else error
      // Set login status to true
      // Decode token and set the currentUser
      if (!token || token === '') throw new Error("No token in storage");
      if (this.jwtHelper.isTokenExpired(token)) throw new Error("Token is Expired");
      const decodedtoken = this.jwtHelper.decodeToken(token);
      if (!decodedtoken || decodedtoken === '') throw new Error("Invalid Token");
      this.currentUser.next(decodedtoken);
      this.isLogged.next(true);
      return true;
    } catch (error) {
      console.log('fallo o no hay token', error); // Only for testing
      this.clearToken();
      return false;
    }
  }

  //Fires when user logouts
  clearToken(): void {
    localStorage.removeItem('app-token');
    this.isLogged.next(false);
    this.currentUser.next(null);
  }

  //Checks if email is already taken
  validateEmail(control: AbstractControl) {
    return this.authService.checkEmail({ email: control.value }).pipe(
      map(res => {
        try {
          if (control.pristine) return null;
          if (res.code === 200 && res.statusMsg === "email-available") return null;                              //If nickname is available
          if (res.code === 200 && res.statusMsg === "duplicated-email") return { emailIsTaken: true };           //If nickname is taken
          throw new Error("Error");
        } catch (error) {
          return { emailIsTakenError: true }                                                                     //If any error(s) occurs during runtime
        }
      })
    )
  }

  //Checks if nickname is already taken
  validateNickname(control: AbstractControl) {
    return this.authService.checkNickname({ nickname: control.value }).pipe(
      map(res => {
        try {
          if (control.pristine) return null;
          if (res.code === 200 && res.statusMsg === "nickname-available") return null;                           //If nickname is available
          if (res.code === 200 && res.statusMsg === "duplicated-nickname") return { nicknameIsTaken: true };     //If nickname is taken
          throw new Error("Error");
        } catch (error) {
          return { nicknameIsTakenError: true }                                                                  //If any error(s) occurs during runtime
        }
      })
    )
  }

  //Find top ten players in the ranking
  getTopRanking(): Observable<any> {
    return this.http.post(`${this.API_URL}/users/getRanking`, null, { headers: this.skipAuthInterceptor });
  }

  getUsers(params: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users/findUsers`, params, { headers: this.skipAuthInterceptor });
  }
}
