import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Validators } from "@angular/forms";
import { HTTPRequestService } from "src/app/services/httprequest.service";
import { ViewBookingsModel } from "src/app/models/view-bookings.model";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { BookingAvailableSearchModel } from "../../../../../models/booking-available-search.model";
import  * as moment from  'moment';
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../../../shared/logout.service";
import { BookDetails } from "../../../../../models/book-details.model";
import { ActivatedRoute } from "@angular/router";
import { BookingReschedule } from "../../../../../models/booking-reschedule.model";
import { ShowAllBookingModel } from "../../../../../models/show-all-booking.model";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  BookForm: FormGroup;
  p: any;
  spin = false;
  VenueID: string = "b18e107f-63af-4ac4-b62e-864a13ceec1e";
  bookings: ShowAllBookingModel[];
  UserID: string;
  Email : string;
  bookingId: string = "";
  constructor(private fb: FormBuilder,
    private _http: HTTPRequestService, private router: Router,
    public dialog: MatDialog, private logoutSvc: LogoutService,
    private route: ActivatedRoute) { }
  SpinOn() {
    this.spin = true;
  }
  SpinOff() {
    this.spin = false;
  }
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
  GetAvailability(event: any) {
    debugger;
    let bookSearch: BookingAvailableSearchModel = new BookingAvailableSearchModel();
    bookSearch.SearchDateTime = moment(new Date()).toISOString();
    bookSearch.SearchLogic = event.value;
    let searchData: string = JSON.stringify(bookSearch);
    this.SpinOn();
    this._http.post(`/api/v1/booking/get-periodic-bookings/?VenueId=${this.VenueID}`, searchData, this.genHeaders()).subscribe(
      (data: ShowAllBookingModel[]) => {
        this.SpinOff();
        debugger;
        this.bookings = data
      },
      error => {
        this.SpinOff();
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
      }

    );
  }
  ngOnInit() {

    if (this.route.snapshot.paramMap.get('id')) {
      this.bookingId = this.route.snapshot.paramMap.get('id');
    }
    else {
      this.router.navigate(['home']);
    }

    if (localStorage.getItem('id')) {
      this.UserID = localStorage.getItem('id');
    }
    else {
      this.router.navigate(['home']);
    }
    if (localStorage.getItem('email')) {
      this.Email = localStorage.getItem('email');
    }
    this.BookForm = this.fb.group(
      {
        BookingFromDate: new FormControl('', [Validators.required]),
        BookingToDate: new FormControl('', [Validators.required])
      }
    )
  }
  validateBookingDuration()
  {
    let fromDate : Date = new Date(this.GetFromDate.value);
    let toDate : Date = new Date(this.GetToDate.value);
    let diff : number = Math.abs(fromDate.getTime() - toDate.getTime());

    if(diff >= 36e5)
      return true;

    return false;
  }

  getCurrentDateTime(): string {
    let now = new Date();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    if (parseInt(month) < 10)
      month = `0${month}`;
    if (parseInt(day) < 10)
      day = `0${day}`;

    let today = `${now.getFullYear()}-${month}-${day}T00:00`;
    return today;
  }
  get GetFromDate(): FormControl {
    return this.BookForm.get('BookingFromDate') as FormControl;
  }
  get GetToDate(): FormControl {
    return this.BookForm.get('BookingToDate') as FormControl;
  }
  public returnTimezoneId(selectedDate): string {
    let objdatetime = new Date(selectedDate);

    let timezone = objdatetime.toTimeString();

    let tzstr = timezone.split("(");

    let timezoneid = tzstr[1].toString().replace(")", "");
    return timezoneid;
  }
  OnConfirm(FormValue) {
    if (!this.validateDate()) {
      
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : "Invalid date time selection, please select a valid date to continue booking with Visento!"
        }
      });
      return;
    }
    if (!this.validateBookingDuration()) {
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : "The minimum duration to book a venue with Visneto is 1 hour."
        }
      });
      return;
    }
    let bookDetails: BookingReschedule = new BookingReschedule();
    bookDetails.BookingId = this.bookingId;
    bookDetails.BookedFrom = moment(this.GetFromDate.value).toISOString();
    bookDetails.BookedTo = moment(this.GetToDate.value).toISOString();
    bookDetails.TimeZoneId = this.returnTimezoneId(this.GetFromDate.value);
    let rescheduleData: string = JSON.stringify(bookDetails);
    this.SpinOn();
    this._http.post(`/api/v1/booking/reschedule-booking`, rescheduleData, this.genHeaders())
      .subscribe((data: any) => {
        if (data) {
          this.SpinOff();
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: data.message
            }
          });
        }
        this.router.navigate([`/profile/${this.UserID}`]);

      }, error => {
        this.SpinOff();

        if (error.status === 401) {
          this.dialog.open(SharedDialogBoxComponent, {
            data: {
              value: 'Sesssion Timed Out. Please login again.'
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
  validateDate(): boolean {

    let dateNow: Date = new Date();
    let fromDate: Date = new Date(this.GetFromDate.value);
    let toDate: Date = new Date(this.GetToDate.value);
    if (fromDate > dateNow && toDate > dateNow && fromDate < toDate) {
      return true;
    }
    return false;
  }

}


