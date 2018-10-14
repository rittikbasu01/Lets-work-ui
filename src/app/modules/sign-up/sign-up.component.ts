import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { HTTPRequestService } from "../../services/httprequest.service";
import { Router } from "@angular/router";
import { RegisterUserModel } from "../../models/register-user.model";
import { HttpHeaders } from "@angular/common/http";
import { ResponseModel } from "../../models/response.model";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { DomSanitizer } from "@angular/platform-browser";
import { Token } from "../../models/token.model";
import { DecodeTokenService } from "../../services/decode-token.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  file;
  picture:string='../../../assets/images/ProfilePhoto.jpg';
  registerForm : FormGroup ;
  private user : RegisterUserModel;
  passwordConfirmStatus : boolean = false ;
  spin : boolean = false;
  password : string = "password";
  cpassword : string = "password"
  hide : boolean = true;
  hideC : boolean = true;
  constructor(private fb : FormBuilder, 
             private httpSvc : HTTPRequestService,
             private router : Router,
             private dialog : MatDialog,
             private decodeTokenSvc : DecodeTokenService) {}
  

  ngOnInit() {
      if(localStorage.getItem('access_token'))
      {
        this.router.navigate(['home']);
      }
      else
        {
          this.registerForm = this.generateFormOnInit();
        }
    
        
      }
  private generateFormOnInit(): FormGroup 
  {
    
    return this.fb.group({
      UserName : ['',[Validators.minLength(5),Validators.required,Validators.pattern('^[A-Za-z]+[0-9]+$')]],
      FirstName : ['',[Validators.required]],
      LastName : ['',[Validators.required]],
      UserEmail : ['',[Validators.required,Validators.email]],
      PhoneNumber : ['',[Validators.required, Validators.min(1),Validators.pattern('^[0-9]+$'),Validators.minLength(10),Validators.maxLength(10)]],
      Password : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100), Validators.pattern('^[A-Za-z0-9_%#@!*^#]+$')]],
      ConfirmPassword : ['',[Validators.required,Validators.minLength(8),Validators.maxLength(100),Validators.pattern('^[A-Za-z0-9_%#@!*&^#]+$')]],
      SPassword : new FormControl(),
      ShowCPassword : new FormControl()
    });
  }
  showPassword()
  {
    if(this.GetSPassword.value)
    {
      this.password = "text";
    }
    else
    {
      this.password = "password"; 
    }
  }
  showCPassword()
  {
    if(this.GetShowCPassword.value)
    {
      this.cpassword = "text";
    }
    else
    {
      this.cpassword = "password"; 
    }
  }
  get GetUserName() : FormControl
  {
    return this.registerForm.get('UserName') as FormControl;
  }
  get GetFirstName() : FormControl
  {
    return this.registerForm.get('FirstName') as FormControl;
  }
  get GetLastName() : FormControl
  {
    return this.registerForm.get('LastName') as FormControl;
  }
  get GetUserEmail() : FormControl
  {
    return this.registerForm.get('UserEmail') as FormControl;
  }
  get GetPhoneNumber() : FormControl
  {
    return this.registerForm.get('PhoneNumber') as FormControl;
  }
  get GetPassword() : FormControl
  {
    return this.registerForm.get('Password') as FormControl;
  }
  get GetConfirmPassword() : FormControl
  {
    return this.registerForm.get('ConfirmPassword') as FormControl;
  }
  get GetSPassword() : FormControl
  {
    return this.registerForm.get('SPassword') as FormControl;
  }
  get GetShowCPassword() : FormControl
  {
    return this.registerForm.get('ShowCPassword') as FormControl;
  }
  spinOn() : void
  {
    this.spin = true;
  }
  spinOff() : void
  {
    this.spin = false;
  }
  //check password validity
  validPassword() : boolean
  {
    if(!(this.GetPassword.value === this.GetConfirmPassword.value) || 
      (!this.GetConfirmPassword.valid || !this.GetPassword.valid))
    {
      this.passwordConfirmStatus = false
      return false;
    }
    else
    {
      this.passwordConfirmStatus = true;
      return true; 
    }
  }
 
  private generateHeader() : HttpHeaders
  {
    return new HttpHeaders().set('Content-Type','application/json').set('Access-Control-Allow-Origin','*');
  }
  register() : void
  {
    let user : RegisterUserModel = new RegisterUserModel(this.registerForm.value);
    let userData : string = JSON.stringify(user);
    
    this.spinOn();
    this.httpSvc.post('/api/v1/Account/register', userData, this.generateHeader()).subscribe(
      (data : any) => 
      {
        this.spinOff();
        if(data.access_token)
        {
          localStorage.setItem('access_token',data.access_token);
          let decodeToken : Token = this.decodeTokenSvc.decodeToken(data.access_token);

          localStorage.setItem('email', decodeToken.email);
          localStorage.setItem('id', decodeToken.id);
          localStorage.setItem('expires', data.expires);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userName', data.user_name);
          this.router.navigate(['home']);
        }
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : `Sign up successful. please your verify email before proceeding with booking a venue!`
          }
        });
      },error =>{
        this.spinOff();
        
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : `Sign Up failed retry because ${error.error.message}`
          }
        });
        
      });
  }

}
