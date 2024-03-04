import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const roleData = JSON.parse(userData);
      if (roleData.role == 'admin') {
        this.router.navigate(['pages/dashboard']);
      } else if (roleData.role == 'organization') {
        this.router.navigate([`pages/users/${roleData.organizationId}`]);
      } else {
        this.router.navigate([`pages/user-info/${roleData._id}`]);

      }
      return false;
    }
    return true;
  }
}
