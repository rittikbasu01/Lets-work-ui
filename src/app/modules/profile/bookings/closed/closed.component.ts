import { Component, OnInit } from '@angular/core';
import { ViewBookingsModel } from "../../../../models/view-bookings.model";
import { Router } from "@angular/router";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import  * as moment from  'moment';
import { ClosedBookingModel } from "../../../../models/closed-booking.model";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { LogoutService } from "../../../../shared/logout.service";
import { SharedDialogBoxComponent } from "src/app/shared/shared-dialog-box/shared-dialog-box.component";
@Component({
  selector: 'app-closed',
  templateUrl: './closed.component.html',
  styleUrls: ['./closed.component.css']
})
export class ClosedComponent implements OnInit {

  constructor(private router : Router, 
              private httpSvc : HTTPRequestService, 
              public dialog : MatDialog, private logoutSvc : LogoutService) { }
  p:any;
  id
  Bookings:ViewBookingsModel[];
  genHeaders(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    else {
      this.router.navigate(['home']);
    }
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`).set('Access-Control-Allow-Origin', '*');
  }
  ngOnInit() {
    if (localStorage.getItem('id'))
      {
        this.id = localStorage.getItem('id');
      }
      else
      {
        this.router.navigate(['home']);  
      }
      let dateNow : string = moment(new Date()).toISOString();
      let closedBookingRequest : ClosedBookingModel = new ClosedBookingModel();
      closedBookingRequest.Date = dateNow;
      closedBookingRequest.UserId = this.id;
      let searchData : string = JSON.stringify(closedBookingRequest);
      this.httpSvc.post(`/api/v1/booking/get-closed-bookings`, searchData, this.genHeaders()).subscribe((data : ViewBookingsModel[]) => 
      {
        if(data)
        {
          this.Bookings = data
        }
      }, error => {
        if (error.status === 401) {
          
                    this.dialog.open(SharedDialogBoxComponent, {
                      data: {
                        value: 'Sesssion Timed Out. Login Again'
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
                  }
      });

  }

}
