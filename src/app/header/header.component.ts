import { Component, OnInit } from '@angular/core';
import { Shared } from "src/app/shared/shared.class";
import { LogoutService } from "../shared/logout.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName : string = "User";
  userLoggedIn: boolean = true;
  constructor(private logoutSvc : LogoutService, private router : Router) 
  {
    
  }
  
  ngOnInit() {

    if(localStorage.getItem('access_token') && localStorage.getItem('userName'))
    {
      this.userName = localStorage.getItem('userName');
      this.userLoggedIn = true;
    }
  }
  redirectToHome()
  {
    if(localStorage.getItem('role') && localStorage.getItem('role') === 'Admin')
      {
        this.router.navigate(['manage']);
      }
    else
      {
        this.router.navigate(['home']);
      }
  }
  public GetLoginStatus()
  {
    if(localStorage.getItem('access_token') && localStorage.getItem('userName'))
    {
      return true;
    }
    else
    {
      return false; 
    }
   
    //return this.logoutSvc.GetLoggedInStatus;
  }
  public GetUserName()
  {
    return localStorage.getItem('userName');
  }
  public LoggingOut() {
   this.logoutSvc.logout();
   this.userName = "User";
   this.userLoggedIn = false;
  }
  getProfileDetails()
  {
    let id = localStorage.getItem('id');  
    this.router.navigate([`profile/${id}`]);
  }
}
