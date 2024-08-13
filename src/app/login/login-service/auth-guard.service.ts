import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable< boolean | UrlTree > | Promise< boolean | UrlTree > | boolean | UrlTree {
    const token = sessionStorage.getItem(AuthService.SESSION_TOKEN_KEY);
    if (token && next.routeConfig?.path === 'login') {
      this.router.navigate(['/list'])
      return false;
    }
    if (!token && next.routeConfig?.path !== 'login'){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
