import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate,CanActivateChild {
 
  constructor(private router : Router) {
    
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role')=== 'Admin')
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
    
    if(localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role')=== 'Admin')
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
