import { Component, OnInit } from '@angular/core';
import { ViewBookingsModel } from "src/app/models/view-bookings.model";
import { Router } from "@angular/router";
import * as moment from 'moment';
import { BookingSearchModel } from "../../../../models/book-search.model";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../../shared/logout.service";
@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent implements OnInit {

  constructor(private router:Router, 
              private httpSvc : HTTPRequestService, 
              public dialog : MatDialog, private logoutSvc : LogoutService ) { }
  p:any;
  hide : boolean = true;
  hideC : boolean = true;
  id : string;
Bookings:ViewBookingsModel[];
  GoToRescheduleScreen(BookingID: string) {
    
    this.router.navigate([`/profile/${localStorage.getItem('id')}/bookings/active/${BookingID}`]);
  }
  spin=false;
  SpinOn()
  {
    this.spin=true;
  }
  SpinOff()
  {
    this.spin=false;
  }

  genHeaders() : HttpHeaders
  {
    let token : string = "";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token');
    }
    else
    {
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
    this.GetActiveBookings();

  }

  GetActiveBookings()
  {
    
    let dateNow : string = moment(new Date()).toISOString();
    let bookingsActive : BookingSearchModel = new BookingSearchModel();
    bookingsActive.Date = dateNow;
    bookingsActive.UserId = localStorage.getItem('id');

    let bookSearchData : string = JSON.stringify(bookingsActive);
     this.SpinOn();
    this.httpSvc.post('/api/v1/Booking/get-active-bookings', bookSearchData, this.genHeaders())
                .subscribe( (data : any ) =>{
                  this.SpinOff();

                  this.Bookings = data;

                } , error => {
                  this.SpinOff();

                  if(error.status === 401)
                    {
                       this.dialog.open(SharedDialogBoxComponent, {
                         data : {
                           value : 'Sesssion Timed Out. Login Again'
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
  CancelBooking(BookingID : string)
  {
    this.httpSvc.put(`/api/v1/booking/cancel-booking/${BookingID}`,"",this.genHeaders()).subscribe((data : any) => {

      if(data)
      {
        this.dialog.open(SharedDialogBoxComponent, {
          data : {
            value : data.message
          }
        });
      }
      this.GetActiveBookings();
    }, error => {
      if(error.status === 401)
        {
           this.dialog.open(SharedDialogBoxComponent, {
             data : {
               value : 'Sesssion Timed Out. Login Again'
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
