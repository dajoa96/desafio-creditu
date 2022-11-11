import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL: string = environment.api.link;

  constructor(
    private http: HttpClient
  ) { }

  authLogin(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, user);
  }
}
