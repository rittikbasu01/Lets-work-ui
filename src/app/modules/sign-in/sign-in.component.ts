import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { HTTPRequestService } from "../../services/httprequest.service";
import { SignInModel } from "../../models/sign-in.model";
import { HttpHeaders } from "@angular/common/http";
import { ResponseModel } from "../../models/response.model";
import { LogoutService } from "../../shared/logout.service";
import { RedirectService } from "../../services/redirect.service";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "src/app/shared/shared-dialog-box/shared-dialog-box.component";
import { GoogleUserModel } from "../../models/google-user.model";
import { Observable, Subscription } from "rxjs";
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { DecodeTokenService } from "../../services/decode-token.service";
import { Token } from "../../models/token.model";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signSubscription: Subscription;

  loginForm : FormGroup;
  sPassword : string = "password";
  spin : boolean = false;
  hide : boolean = true;
  
   private clientId:string = '350310165471-rhvfrn9tit8bdhqgaiobt16gmuq5fr64.apps.googleusercontent.com';
   
   constructor(private socialAuthService : AuthService,
               private ref: ChangeDetectorRef, private fb : FormBuilder, 
               private route : ActivatedRoute,private router : Router, 
               private httpSvc : HTTPRequestService, private logoutSvc : LogoutService,
               private redirectSvc : RedirectService, private dialog : MatDialog, private decodeTokenSvc : DecodeTokenService) 
   { 
 
   }
 
   ngOnInit() {
      if(localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role') === 'User')
      {
        this.router.navigate(['home']);
      }
      else if(localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role') === 'Admin')
      {
        this.router.navigate(['manage']);
      }
      
        this.loginForm = this.genFormInit();
    }
  genFormInit() : FormGroup
  {
    return this.fb.group({
      userName : ['',[Validators.required, Validators.pattern('^[A-Za-z0-9]+$'),Validators.minLength(4)]],
      password : ['',[Validators.required, Validators.pattern('^[A-Za-z0-9_%#@!*&^#]+$')]],
      showPassword : new FormControl()
    });
  }
  get GetShowPassword() : FormControl
  {
    return this.loginForm.get('showPassword') as FormControl;
  }
  changeShowPassword()
  {
    if(this.GetShowPassword.value)
      this.sPassword = "text";
    else
      this.sPassword = "password"; 
  }
  spinOn()
  {
    this.spin = true;
  }
  spinOff()
  {
    this.spin = false;
  }
  private generateHeader() : HttpHeaders
  {
    return new HttpHeaders().set('Content-Type','application/json').set('Access-Control-Allow-Origin','*');
  }
  public socialSignIn(socialPlatform : string) 
  {
    let socialPlatformProvider;
   
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
  
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      
      let gUser : GoogleUserModel = new GoogleUserModel();
      gUser.TokenID = userData.idToken;
      gUser.ProviderKey =  userData.id;
      gUser.DisplayName = userData.name;
      gUser.ImageUrl = userData.image;
      gUser.Email = userData.email;
      gUser.ProviderName = 'Google';
      let userDataSerialized : string = JSON.stringify(gUser);
      this.signInAPI(userDataSerialized);
    });
    
  }
   
    signInAPI(userData : string)
    {
      this.spinOn();
      this.httpSvc.post(`/api/v1/Account/external-login`,userData,this.generateHeader()).subscribe((data : any) =>
      {
        if(data.access_token)
          {
            this.logoutSvc.LoggedInStatus = true;
            this.logoutSvc.UserName = data.user_name;
            localStorage.setItem('access_token',data.access_token);
            
            let decodeToken : Token = this.decodeTokenSvc.decodeToken(data.access_token);
            localStorage.setItem('email', decodeToken.email);
            localStorage.setItem('id', decodeToken.id);
            localStorage.setItem('expires', data.expires);
            localStorage.setItem('role', data.role);
            localStorage.setItem('userName', data.user_name);
            localStorage.setItem('provider', data.provider);
            this.ref.detectChanges();
            this.dialog.open(SharedDialogBoxComponent, {
              data : {
                value : 'Successfully LoggedIn'
              }
            });
            this.spinOff();
            this.ref.detectChanges();
            if(data.role && data.role === 'Admin')
            {
              
              this.router.navigate(['manage']); 
              
            }    
            else if (data.role && data.role === 'User' && localStorage.getItem('source') === '1')
            {
              this.ref.detectChanges();
              let id : string = this.route.snapshot.paramMap.get('id');
              this.router.navigate([`/home/book/${id}`]);
              localStorage.removeItem('source');
              this.ref.detectChanges();
            }
            
            else if (data.role && data.role === 'User')
              {
                this.ref.detectChanges(); 
                this.router.navigate(['home']);
                this.ref.detectChanges();
              }
            
          }
          this.ref.detectChanges();
      }, error => 
      {
        this.spinOff();
        if(error.error.message)
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : error.error.message
            }
          });
        }
        else
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : 'Retry'
            }
          });
        }
        localStorage.removeItem('source');
        this.ref.detectChanges();
      });
    }
   
 
  //Inbuilt Sign in
  login()
  {
    let user : SignInModel = new SignInModel(this.loginForm.value);
    let userData : string = JSON.stringify(user);
    this.spinOn();
    this.httpSvc.post('/api/v1/account/login', userData, this.generateHeader()).subscribe( (data : any) =>
    {
      if(data.access_token)
        {
          this.logoutSvc.LoggedInStatus = true;
          this.logoutSvc.UserName = data.user_name;
          localStorage.setItem('access_token',data.access_token);
          let decodeToken : Token = this.decodeTokenSvc.decodeToken(data.access_token);

          localStorage.setItem('email', decodeToken.email);
          localStorage.setItem('id', decodeToken.id);
          localStorage.setItem('expires', data.expires);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userName', data.user_name);
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : 'Successfully LoggedIn'
            }
          });
          this.spinOff();
          if(data.role && data.role === 'Admin')
            {
              this.router.navigate(['manage']); 
              
            }
            
          else if (data.role && data.role === 'User' && localStorage.getItem('source') === '1')
          {
            
            let id : string = this.route.snapshot.paramMap.get('id');
            this.router.navigate([`/home/book/${id}`]);
            
            localStorage.removeItem('source');
            
          }
          
          else if (data.role && data.role === 'User')
            {
              this.router.navigate(['home']); 
            }
          
        }
    }, error => 
    {
      this.spinOff();
      if(error.error.message)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : error.error.message
          }
        });
      }
      else
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : 'Retry'
          }
        });
      }
      localStorage.removeItem('source');
     
    });
  }
  redirectToSignUp()
  {
    this.router.navigate(['signup']);
  }
  redirectToForgetPassword()
  {
    this.router.navigate(['password-reset']);
  }
 
}
