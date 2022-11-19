import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CheckEmailRequestModel, CheckNicknameRequestModel, LoginRequestModel, SignUpRequestModel } from '../models/user-requests.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = environment.api.link;

  constructor(
    private http: HttpClient
  ) { }

  checkEmail(email: CheckEmailRequestModel): Observable<any>  {
    return this.http.post(`${this.API_URL}/users/checkEmail`, email);
  }

  checkNickname(nickname: CheckNicknameRequestModel): Observable<any>  {
    return this.http.post(`${this.API_URL}/users/checkNickname`, nickname);
  }

  signUp(user: SignUpRequestModel): Observable<any> {
    return this.http.post(`${this.API_URL}/users/singUp`, user);
  }

  login(user: LoginRequestModel): Observable<any> {
    return this.http.post(`${this.API_URL}/users/login`, user);
  }
}
