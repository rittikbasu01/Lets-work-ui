import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  private isUserLoggedIn : boolean;
  private userName : string;
  public set LoggedInStatus(values)
  {
    this.isUserLoggedIn = values;
  }
  public get GetLoggedInStatus()
  {
    return this.isUserLoggedIn;
  }
  set UserName(values)
  {
    this.userName = values;
  }
  get GetUserName()
  {
    return this.userName;
  }
  constructor(private router : Router) {
   
   }
  logout()
  {
    if(localStorage.getItem('provider') && localStorage.getItem('provider') === 'Google' && (localStorage.getItem('access_token') || localStorage.getItem('role') || localStorage.getItem('id')))
      {
        this.LoggedInStatus = false;
        localStorage.clear();
        this.router.navigate(['home']);        
      }
      if(localStorage.getItem('access_token') || localStorage.getItem('role') || localStorage.getItem('id'))
      {
          
          this.LoggedInStatus = false;
          localStorage.clear();
          this.router.navigate(['home']);
      }
      
  }
 

}
