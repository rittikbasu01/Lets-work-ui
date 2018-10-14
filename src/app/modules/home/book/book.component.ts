import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { DialogboxComponent } from "../../home/book/dialogbox/dialogbox.component";
import { Router, ActivatedRoute } from "@angular/router";
import { BookDetails } from "../../../models/book-details.model";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { Component } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
import { BookingService } from "../../../services/booking.service";
import { LogoutService } from "../../../shared/logout.service";
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {


  constructor(public dialog: MatDialog, private route: ActivatedRoute, private router: Router, private httpRequestService: HTTPRequestService, private bookSvc : BookingService, private logoutSvc : LogoutService) 
  { }

  BookForm: FormGroup;

  message: string;
  message1: string;
  bookedFromDate: string;
  bookedToDate: string;
  currentDate: string;
  validDate : boolean =false;
  spinStatus : boolean =false;
  ngOnInit() {

    
    if(!this.bookSvc.GetBookedFormDate || !this.bookSvc.GetBookedToDate || !this.route.snapshot.paramMap.get('id'))
    {
      this.router.navigate(['home']);
    }
    this.bookedFromDate = this.bookSvc.GetBookedFormDate;
    this.bookedToDate = this.bookSvc.GetBookedToDate;
    this.BookForm = new FormGroup({
      
      ReferralCode: new FormControl('',Validators.pattern['^[A-Za-z]+[0-9]+?$'])
    });
  }
  spinOn()
  {
    this.spinStatus = true;
  }
  spinOff()
  {
    this.spinStatus = false;
  }
  get GetReferralCode() : FormControl
  {
    return this.BookForm.get('ReferralCode') as FormControl;
  }
  generateHeader(): HttpHeaders {
    let token: string = "";
    if (localStorage.getItem('access_token')) {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Access-Control-Allow-Origin','*').set('Content-Type', 'application/json').set('Authorization', `Bearer ${token}`);
  }
  onSubmit() 
  {


    let id : string;
    let access_token : string;
    if(localStorage.getItem('id') && localStorage.getItem('access_token'))
    {
      id = localStorage.getItem('id');
      access_token = localStorage.getItem('access_token');
    }
  
    let bookDetailObject: BookDetails = new BookDetails();
    bookDetailObject.BookedFrom = this.bookedFromDate;
    bookDetailObject.BookedTo = this.bookedToDate;
    bookDetailObject.VenueID = this.route.snapshot.paramMap.get('id');
    bookDetailObject.UserEmail = localStorage.getItem('email');
    bookDetailObject.UserID = localStorage.getItem('id');
    bookDetailObject.TimeZoneId = this.bookSvc.GetTimeZone;
    bookDetailObject.ReferralCode = this.GetReferralCode.value;
    
    this.message = "Your booking for the venue is confirmed!";
    this.message1 = "Sorry, This venue is not available for " + bookDetailObject.BookedFrom + " to " + bookDetailObject.BookedTo + " .Please choose some other time slot ";
    let bookDetail: string = JSON.stringify(bookDetailObject);
    this.spinOn();
    this.httpRequestService.post("/api/v1/Booking", bookDetail, this.generateHeader()).subscribe((data1: any) => 
    {
      this.spinOff();
      this.dialog.open(DialogboxComponent,
        {
          data: {
            dataKey: data1.message
          }
        }
      )
     
    },
      (error: any) => {
        this.spinOff();
        if(error.status === 401)
          {
            this.dialog.open(DialogboxComponent, {
              data : {
                value :`Session Timed Out. Login again`
              }
            });
            this.logoutSvc.logout();
          }
          else
            {
              this.dialog.open(DialogboxComponent,
                {
                  data: {
                    dataKey: error.error.message
                  }
                });
            }
      });
  }
}
