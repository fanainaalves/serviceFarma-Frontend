import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1/authorization';

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token`, {username, password}).pipe(
      map(response => {
        if (response.token){
          localStorage.setItem('token', response.token);
          this.router.navigate(['/list']);
          return {success: true};
        } else {
          return {sucess: false, message: 'Login ou senha inválidos'};
        }
      }),
      catchError(error => {
        return of ({success: false, message: 'Ocorreu um erro ao tentar fazer login. Tente novamente'})
      })
    );
  }

  logout(): void{
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  validateToken(token: string): Observable<boolean>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiUrl}/validation`, {token}, {headers}).pipe(
      map(response => response.valid),
      catchError(error => of(false))
    )
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
  
  hasPermission(permission: string): boolean {
    const role = this.getUserRole();
    if (role === 'ADMIN') {
      return true;
    } else if (role === 'USER' && permission === 'view') {
      return true;
    }
    return false;
  }


}
