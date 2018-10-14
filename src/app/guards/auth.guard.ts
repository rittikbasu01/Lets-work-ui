import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private router : Router) {
    

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(localStorage.getItem('access_token') && localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('role') === 'User')
      {
        return true;
      }
      else
      {
        this.router.navigate(['home']);
        return false;
      }
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(localStorage.getItem('access_token') && localStorage.getItem('email') && localStorage.getItem('role') && localStorage.getItem('role') === 'User')
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
