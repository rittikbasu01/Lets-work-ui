import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { RegisterUserModel } from "../../../../models/register-user.model";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../../shared/logout.service";

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  passwordConfirmStatus : boolean = false;
  registerForm: FormGroup;
  spin : boolean = false;
  password : string = "password";
  cpassword : string = "password"
  hide : boolean = true;
  hideC : boolean = true;
  constructor(private fb: FormBuilder, private httpSvc: HTTPRequestService,private logoutSvc : LogoutService ,private router: Router, public dialog : MatDialog) {

  }
  ngOnInit() {

    this.registerForm = this.generateFormOnInit();
  }
  private generateHeader(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    return header;
  }
  private generateFormOnInit(): FormGroup {
    return this.fb.group({
      UserName: ['', [Validators.minLength(4), Validators.required]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      UserEmail: ['', [Validators.required, Validators.email]],
      PhoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.min(1),Validators.minLength(10),Validators.maxLength(10)]],
      Password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      ConfirmPassword: ['', [Validators.required]],
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
  spinOn() : void
  {
    this.spin = true;
  }
  spinOff() : void
  {
    this.spin = false;
  }
  register(): void {
    let user: RegisterUserModel = new RegisterUserModel(this.registerForm.value);
    let signUpData = JSON.stringify(user);
    let token: string = localStorage.getItem('access_token');
    let header: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
    this.spinOn();
    this.httpSvc.post('/api/v1/Account/AddAdmin', signUpData, this.generateHeader()).subscribe(
      (data: any) => {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : 'Added admin successfully'
          }
        });
        this.router.navigate(['/manage/admin']);
      }, error => {
          this.spinOff();
        if(error.status === 401)
          {
            this.dialog.open(SharedDialogBoxComponent, {
              data : {
                value : 'Session Timed Out. Login in again'
              }
            });
            this.logoutSvc.logout();
          }
          else
            {
              this.dialog.open(SharedDialogBoxComponent, {
                data : {
                  value : error.error.message
                }
              });
            }
        
      });
  }

}
