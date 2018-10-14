import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileEditAuthGuard implements CanActivate {
  
  constructor(private router : Router) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(localStorage.getItem('access_token') && localStorage.getItem('email') && localStorage.getItem('role') && !localStorage.getItem('provider'))
        {
          return true;
        }
        else
        {
          this.router.navigate(['home']);
          return false;
        }
  }
}
