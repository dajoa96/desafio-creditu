import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CheckEmailRequestModel, CheckNicknameRequestModel, LoginRequestModel, RegisterRequestModel } from '../models/user-requests.model';
import { InterceptorSkip } from '../shared/interceptor/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL: string = environment.api.link;
  private readonly skipAuthInterceptor: HttpHeaders = new HttpHeaders().set(InterceptorSkip, '');

  constructor(
    private http: HttpClient
  ) { }

  checkEmail(email: CheckEmailRequestModel): Observable<any>  {
    return this.http.post(`${this.API_URL}/users/checkEmail`, email, { headers: this.skipAuthInterceptor });
  }

  checkNickname(nickname: CheckNicknameRequestModel): Observable<any>  {
    return this.http.post(`${this.API_URL}/users/checkNickname`, nickname, { headers: this.skipAuthInterceptor });
  }

  signUp(user: RegisterRequestModel): Observable<any> {
    return this.http.post(`${this.API_URL}/users/singUp`, user, { headers: this.skipAuthInterceptor });
  }

  login(user: LoginRequestModel): Observable<any> {
    return this.http.post(`${this.API_URL}/users/login`, user, { headers: this.skipAuthInterceptor });
  }

  removeUser(id: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/removeUser`, { body: { _id: id } });
  }

  updateUser(user: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/users/updateUser`, user);
  }


}
