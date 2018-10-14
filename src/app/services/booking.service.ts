import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookedFromDate : string;
  bookedToDate : string;
  timeZone : string;

  constructor() { }

  set SetBookedFromDate(values)
  {
    this.bookedFromDate = values;
  }
  set SetBookedToDate(values)
  {
    this.bookedToDate = values;
  }
  set SetTimeZone(values)
  {
    this.timeZone = values;
  }

  get GetBookedFormDate()
  {
    return this.bookedFromDate;
  }
  get GetBookedToDate()
  {
    return this.bookedToDate;
  }
  get GetTimeZone()
  {
    return this.timeZone;
  }
  
}
