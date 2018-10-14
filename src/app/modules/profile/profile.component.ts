import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { HTTPRequestService } from "../../services/httprequest.service";
import { UserProfileModel } from "../../models/userProfile.model";
import { HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../shared/logout.service";
import { CheckUserNameModel } from "../../models/check-username.model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user: UserProfileModel;
  profileImage : string;
  userID: string;
  spin: boolean;
  formData: FormData;
  CheckAvailability:boolean=false;
  userNameReadOnly:boolean=true;
  lastNameReadOnly:boolean=true;
  firstNameReadOnly:boolean=true;
  phoneNumberReadOnly:boolean=true;
  userNameStatus : boolean = true; 
  availibilityChecked = false;
  canEdit : boolean ;
  profileImageUrl : string;
  constructor(private fb: FormBuilder,
    private _http: HTTPRequestService,
    private router: Router,
    public dialog: MatDialog, private logoutSvc : LogoutService, private route : ActivatedRoute) { }

  ngOnInit() {
   
    if(!this.route.snapshot.paramMap.get('id'))
    {
      this.router.navigate(['home']);
    }
    this.userID = this.route.snapshot.paramMap.get('id');
    this.GetUser();
    this.formData = new FormData();

    this.userForm = this.fb.group(
      {
        UserName: ['', [Validators.minLength(5), Validators.required, Validators.pattern('^[A-Za-z]+[0-9]+$')]],
        FirstName: ['', [Validators.required]],
        LastName: ['', [Validators.required]],
        PhoneNumber: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]]
      }
    );
    if(localStorage.getItem('provider'))
      {
        this.canEdit = false;
        this.GetUserName.disable();
        this.GetFirstName.disable();
        this.GetLastName.disable();
        this.GetPhoneNumber.disable();

      }
      else
      {
        this.canEdit = true;
      }

  }

  generateFileHeaders() : HttpHeaders
  {
    let token : string = "";
    if(localStorage.getItem('access_token'))
      token = localStorage.getItem('access_token');
  
    return new HttpHeaders()
              .set('Authorization',`Bearer ${token}`)
              .set('Access-Control-Allow-Origin','*');
  }

  genHeaders() : HttpHeaders
  {
    let token : string = "";
    if(localStorage.getItem('access_token'))
      token = localStorage.getItem('access_token');
  
    return new HttpHeaders()
              .set(`Content-Type`, `application/json`)
              .set('Authorization',`Bearer ${token}`)
              .set('Access-Control-Allow-Origin','*');
  }

  genHeadersPostData() : HttpHeaders
  {
    let token : string = "";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Content-Type','application/json').set('Authorization',`Bearer ${token}`).set('Access-Control-Allow-Origin','*');
  }
  GetUser() {
    this.spinOn;
    this._http.get(`/api/v1/Profile/user/${this.userID}`, this.genHeaders()).subscribe((data: UserProfileModel) => {
      if (data) {
        this.user = data;
        this.userForm.patchValue(this.user)
        this.profileImage = data.ProfileImageUrl;
        this.profileImageUrl = data.ProfileImageUrl;
        localStorage.setItem('userName',this.user.UserName);
      }
      this.spinOff();
    }, error => {
      this.spinOff();
      if(error.status === 401)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: 'Session timed out. Login Again'
          }
        });  
        this.logoutSvc.logout();
      }
     else
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data: {
            value: error.message
          }
        });
        this.router.navigate(['home']);
      }

    });
  }
  get GetUserName(): FormControl {
    return this.userForm.get('UserName') as FormControl;
  }
  get GetFirstName(): FormControl {
    return this.userForm.get('FirstName') as FormControl;
  }
  get GetLastName(): FormControl {
    return this.userForm.get('LastName') as FormControl;
  }
  get GetPhoneNumber(): FormControl {
    return this.userForm.get('PhoneNumber') as FormControl;
  }
  spinOn(): void {
    this.spin = true;
  }
  spinOff(): void {
    this.spin = false;
  }

  DeleteImage() {
    this.spinOn();
    this._http.delete(`/api/v1/profile/profile-image/${this.userID}`, this.genHeaders()).
      subscribe(
      response => {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data:
          {
            value: "Image deleted sucessfully"

          }
        })
        this.GetUser();
      },
      error => {
        
        this.spinOff();
        if (error.status === 401) {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Session Timed Out. Please login again!!`
            }
          });
           this.logoutSvc.logout();
        }
        else {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: "Failed to delete the image please try again!!"
            }
          });
        }
      })

  }

  ImageUpload(event) {
    
    let file = event.target.files[0];

    if(!file)
    {
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : "Please upload at least one image as your profile picture to continue!!"
        }
      });
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event: any) => {
      this.profileImage = (event.target.result);
    }
    this.formData.append(file.name, file);
    
    this.spinOn();
    this._http.putFile(`/api/v1/profile/profile-image/${this.userID}`, this.formData, this.generateFileHeaders())
    .subscribe(
      Response => {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data:
          {
            value: "Profile image details updated sucessfully!!!"
          }
        })
        this.GetUser();
        this.formData = new FormData();
      },
      error => {
        this.formData = new FormData();
        this.spinOff();
        if (error.status === 401) 
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Session Timed Out. Please login again!!`
            }
          });
           this.logoutSvc.logout();
        }
        else {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: error.error.message
            }
          });
          this.GetUser();
        }
      });  
  }

  //sends email for change password
  sendChangePasswordEmail()
  {
    this.spinOn();
    this._http.get(`/api/v1/manage/changepassword-request/${localStorage.getItem('email')}`, this.genHeaders()).subscribe((response : any) => {
      this.spinOff();
      if(response)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : "Email sent for change password"
          }
        });
        
      }
    }, error => {
      this.spinOff();
      if(error.status === 401)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : "Session Timed Out. Login again"
          }
        });
        this.logoutSvc.logout();
      }
      else
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : error.message
          }
        }); 
      }

    });
  }

  //Checks if the username is available
  checkUserNameAvailable()
  {
    this.spinOn();
    this.availibilityChecked = true;
    let checkUsernameData : CheckUserNameModel = new CheckUserNameModel();
    checkUsernameData.Id = localStorage.getItem('id');
    checkUsernameData.UserName = this.GetUserName.value;
    let userData : string = JSON.stringify(checkUsernameData);
    
    this._http.post(`/api/v1/manage/check-username`, userData, this.genHeadersPostData()).subscribe((response : any ) => 
    {
      
      if(response.message == "true")
      {
        this.userNameStatus = true;
      }
      else
      {
         this.userNameStatus = false;
      }
      this.spinOff();
    }, error =>
   {
     this.spinOff();
      if(error.status === 401)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : "Session Timed Out. Login Again"
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
  changeUserNameStatus()
  {
    this.userNameStatus = false;
    this.availibilityChecked=false
  }

  //modify
  UpdateDetails() {
    this.spinOn();
    let httpHeader = new HttpHeaders().set('Access-Control-Allow-Origin', '*');
    let updatedUserDetails = new UserProfileModel(this.userForm.value)
    this._http.put(`/api/v1/profile/${this.userID}`, JSON.stringify(updatedUserDetails), this.genHeaders())
      .subscribe(
      Response => {
        this.spinOff();
        this.dialog.open(SharedDialogBoxComponent, {
          data:
          {
            value: "Updated profile details sucessfully!!!"

          }
        })
        this.GetUser();
        this.formData = new FormData();
      },
      error => {
        this.formData = new FormData();
        this.spinOff();
        if (error.status === 401) 
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: `Session Timed Out. Please login again!!`
            }
          });
           this.logoutSvc.logout();
        }
        else {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: error.error.message
            }
          });
          this.GetUser();
        }
      });  
   

  }

  ViewBookings(selectedOption)
  {
    if(selectedOption.value=="active")
      {
        this.router.navigate([`/profile/${localStorage.getItem('id')}/bookings/active`]);
      }
    else if(selectedOption.value=="closed")
    this.router.navigate([`/profile/${localStorage.getItem('id')}/bookings/closed`]);
  }

}
