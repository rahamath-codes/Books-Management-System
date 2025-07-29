import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      this.router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);
    const expectedRoles: string[] = route.data['roles'];

    if (!expectedRoles || expectedRoles.length === 0) {
      // If no roles specified, allow access
      return true;
    }

    if (expectedRoles.includes(user.role)) {
      return true;
    } else {
      alert('Access denied: Unauthorized role');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
