import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../login/login-model/user';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username!: User;
  dropdownOpen = false;

  constructor(private router: Router) {}


  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    alert('Saindo...');
    this.router.navigate(['/login'])
  }
}
