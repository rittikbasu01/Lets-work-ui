import { Component, OnInit } from '@angular/core';
import { ShowAllBookingModel } from "../../../models/show-all-booking.model";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../shared/logout.service";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {

  constructor(private httpSvc : HTTPRequestService, public dialog : MatDialog, private logoutSvc : LogoutService) { }
  p:number;
  BookingID : string;
  Bookings : ShowAllBookingModel[];

  ngOnInit() {
    let token : string = "";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token'); 
    }
    let header : HttpHeaders = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    this.httpSvc.get('/api/v1/Booking', header).subscribe( (data : ShowAllBookingModel[]) => 
    {
      
      if(data)
        {
          
          this.Bookings = data;
        }
    } , error => {

        if(error.message === 401)
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : "Session timed out.Login again"
            }
          });
          this.logoutSvc.logout();
        }
        else
          {
            this.dialog.open(SharedDialogBoxComponent, {
              data : {
                value : "Failed to load booking data"
              }
            });
          }

    });

  }

}
