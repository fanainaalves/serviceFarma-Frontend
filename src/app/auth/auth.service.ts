import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private users = [
    { username: 'fanaina', password: '1234', role: 'ADMIN'},
    { username: 'heldonjose', password: '5678', role: 'USER'}
  ];

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.router.navigate(['/list']);
      return true;
    }
    return false;
  }

  logout(): void{
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  getUserRole(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  }
}
