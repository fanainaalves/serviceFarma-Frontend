import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../login/login-service/auth.service';
import { User } from '../../login/login-model/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  username: string = '';

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void{
    this.authService.getCurrentUser().subscribe(
      (user: User) => {
        this.username = user.username;
      },
      error => {
        console.error("erro ao carregar usuario", error)
        this.username = 'Usuario';
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
