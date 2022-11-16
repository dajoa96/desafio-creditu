import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLogged$: Observable<boolean> = this.isLogged.asObservable();
  currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  currentUser$: Observable<any> = this.currentUser.asObservable();

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
      if (!token) throw new Error("No token in storage");
      this.isLogged.next(true);
      this.currentUser.next(token);
      console.log('si hay token')
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
    //Should redirect?
  }

  constructor() { }
}
