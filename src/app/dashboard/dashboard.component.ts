import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [MatToolbarModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  role: string | null = null;

  constructor(private authservice: AuthService){}

  ngOnInit(): void {
      this.role = this.authservice.getUserRole();
  }

  logout(): void {
    this.authservice.logout();
  }

}
