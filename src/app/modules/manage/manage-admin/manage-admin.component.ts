import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RegisterUserModel } from "../../../models/register-user.model";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "src/app/shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../shared/logout.service";

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.css']
})
export class ManageAdminComponent implements OnInit {
  searchText: string;
  p:any;
  constructor(private router: Router, private _httpRequest: HTTPRequestService, public dialog : MatDialog, private logoutSvc : LogoutService) { }
  admins: RegisterUserModel[];
  ngOnInit() {
    this._httpRequest.get('/api/v1/profile/Admin', this.generateHeaders())
      .subscribe((response: RegisterUserModel[]) => {
        
       

        this.admins = response;
      },
      error => {
        if(error.status === 401)
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : `Session Timed out. Login Again`
            }
          });
          this.logoutSvc.logout();
        }
        else
          {
            this.dialog.open(SharedDialogBoxComponent, {
              data : {
                value : `Failed to load data. Retry`
              }
            });
          }
      });

  }


  goToAddAdmin() {
    this.router.navigate(['/manage/admin/add']);
  }
  generateHeaders(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}
