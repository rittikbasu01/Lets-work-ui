import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { HTTPRequestService } from "../../services/httprequest.service";
import { FormBuilder } from "@angular/forms";
import { ChangePasswordModel } from "../../models/change-password.model";
import { HttpHeaders } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../shared/logout.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm : FormGroup;
  passwordConfirmStatus : boolean;
  password : string = "password";
  cpassword : string = "password";
  opassword : string = "password";
  spin : boolean = false;
  token : string;
  hide : boolean = true;
  hideC : boolean = true;
  hideO : boolean = true;
  constructor(private fb : FormBuilder, private logoutSvc : LogoutService ,private httpSvc : HTTPRequestService,private route : ActivatedRoute, private router : Router, public dialog : MatDialog) 
  { }
  ngOnInit() {
    let id : string = this.route.snapshot.paramMap.get('id');
    if(id)
    {
     this.token = id; 
    }
    else
    {
      this.router.navigate(['home']);
    }

    this.changePasswordForm = this.genForm();
  }
  genForm() : FormGroup
  {
    return this.fb.group({
      OldPassword : new FormControl('',[Validators.required]),
      NewPassword : new FormControl('',[Validators.required]),
      ConfirmPassword : new FormControl('',[Validators.required]),
      ShowCPassword : new FormControl(),
      SPassword : new FormControl(),
      ShowOldPassword : new FormControl()
    });
  }
 
  get GetPassword() : FormControl
  {
    return this.changePasswordForm.get('NewPassword') as FormControl;
  }
  get GetConfirmPassword() : FormControl
  {
    return this.changePasswordForm.get('ConfirmPassword') as FormControl; 
  }
  get GetSPassword()
  {
    return this.changePasswordForm.get('SPassword') as FormControl;
  }
  get GetOldPassword()
  {
    return this.changePasswordForm.get('OldPassword') as FormControl;
  }
  get GetShowCPassword()
  {
    return this.changePasswordForm.get("ShowCPassword") as FormControl;
  }
  get GetShowOldPassword()
  {
    return this.changePasswordForm.get('ShowOldPassword') as FormControl;
  }
  validatePassword()
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
  showOldPassword()
  {
    if(this.GetShowOldPassword.value)
    {
      this.opassword = "text";
    }
    else
    {
      this.opassword = "password";  
    }
  }
  spinOn()
  {
    this.spin = true;
  }
  spinOff()
  {
    this.spin = false;
  }
  genHeaders() : HttpHeaders
  {
    return new HttpHeaders().set('Content-Type','application/json').set('Access-Control-Allow-Origin','*').set('Authorization',`Bearer ${this.token}`);
  }
  Reset()
  {
    this.hide = true;
    this.hideC = true;
    this.hideO = true;
    this.changePasswordForm.reset();
    this.GetOldPassword.setValue('');
    this.GetConfirmPassword.setValue('');
    this.GetPassword.setValue('');
  }
  changePassword()
  {
    let changePasswordData : ChangePasswordModel = new ChangePasswordModel(this.changePasswordForm.value);
    this.spinOn();
    let dataChangePassword : string = JSON.stringify(changePasswordData);
    this.httpSvc.post(`/api/v1/profile/change-password?token=${this.token}`,dataChangePassword, this.genHeaders()).subscribe((response : any) => 
    {

      if(response)
        {
          this.spinOff();
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : response.message
            }});
            if(localStorage.getItem('email') === response.email)
              {
                this.logoutSvc.logout();
                this.router.navigate(['home']);
              }
        }

    }, error => {

      this.spinOff();
      if(error.status === 401)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : "Unauthorized attempt to reset password"
          }});
      }
      else
      {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : error.error.message
          }});
      }
    });
  }
}
