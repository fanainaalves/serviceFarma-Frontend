import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { LoginResponse } from '../login-type/login';
import { User } from '../login-model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/api/v1/authorization';

  public static readonly SESSION_USER_KEY = 'session_username';
  public static readonly SESSION_TOKEN_KEY = 'session_password';

  constructor(private router: Router, private httpClient: HttpClient) { }

  clean(): void{
    window.sessionStorage.clear();
  }

  clearFormData(): void{}

  login(username: string, password: string){
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/token`, {username, password}).pipe(
      tap((value) => {
        this.saveUserDataInSession(value.token, value.user);
        this.router.navigate(['/list']);
      }),
    );
  }

  signup(username: string, password: number){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/token", {username, password}).pipe (
      tap((value) => {
        this.saveUserDataInSession(value.token, value.user);
      })
    )
  }

  private saveUserDataInSession(token: string, user: User){
    sessionStorage.setItem(AuthService.SESSION_TOKEN_KEY, token);
    sessionStorage.setItem(AuthService.SESSION_USER_KEY, JSON.stringify(user));
  }

  private getUserSession(): any {
    const user = window.sessionStorage.getItem(AuthService.SESSION_USER_KEY);
    if(user){
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    if(typeof window !== 'undefined'){
      const user = window.sessionStorage.getItem(AuthService.SESSION_USER_KEY);
      if(user){
        return true;
      }
    }
    return false;
  }

  logout(){
    sessionStorage.removeItem(AuthService.SESSION_USER_KEY);
    sessionStorage.removeItem(AuthService.SESSION_TOKEN_KEY);
  }

  reloadPage(): void{
    window.location.reload();
  }

}
