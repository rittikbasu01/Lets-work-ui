import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { HTTPRequestService } from "../../services/httprequest.service";
import { ForgotPasswordModel } from "src/app/models/forgot-password.model";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "src/app/shared/shared-dialog-box/shared-dialog-box.component";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm : FormGroup;
  passwordConfirmStatus : boolean;
  password : string = "password";
  cpassword : string = "password";
  token : string;
  spin :boolean = false;
  hide : boolean = true;
  hideC : boolean = true;
  constructor(private fb : FormBuilder, private httpSvc : HTTPRequestService, private route : ActivatedRoute, private router : Router, public dialog : MatDialog) 
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

    this.forgotPasswordForm = this.genForm();
  }
  genForm() : FormGroup
  {
    return this.fb.group({
      UserName : new FormControl('',[Validators.required]),
      NewPassword : new FormControl('',[Validators.required]),
      ConfirmPassword : new FormControl('',[Validators.required]),
      ShowCPassword : new FormControl(),
      SPassword : new FormControl()
    });
  }
  get GetUserName() : FormControl
  {
    return this.forgotPasswordForm.get('UserName') as FormControl;
  }
  get GetPassword() : FormControl
  {
    return this.forgotPasswordForm.get('NewPassword') as FormControl;
  }
  get GetConfirmPassword() : FormControl
  {
    return this.forgotPasswordForm.get('ConfirmPassword') as FormControl; 
  }
  get GetSPassword()
  {
    return this.forgotPasswordForm.get('SPassword') as FormControl;
  }
  get GetShowCPassword()
  {
    return this.forgotPasswordForm.get("ShowCPassword") as FormControl;
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
    return new HttpHeaders().set('Content-Type','application/json').set('Authorization',`Bearer ${this.token}`).set('Access-Control-Allow-Origin','*');
  }
  updatePassword()
  {
    let formDataModel : ForgotPasswordModel = new ForgotPasswordModel(this.forgotPasswordForm.value);
    this.spinOn();
    let dataForgotPassword : string = JSON.stringify(formDataModel);
    this.httpSvc.post(`/api/v1/profile/forgot-password`, dataForgotPassword, this.genHeaders()).subscribe((response : any) => 
    {
      if(response)
      {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : response.message
          }});
      }
    }
    ,error => {
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
