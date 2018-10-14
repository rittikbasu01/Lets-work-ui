import { Injectable } from '@angular/core';
import { Venue } from "../models/venue.model";

@Injectable({
  providedIn: 'root'
})
export class ViewVenueService {

  venueList : Venue[];
  constructor() { }

  get GetVenues()
  {
    return this.venueList;
  }
  set SetVenues(values)
  {
    this.venueList = values;
  }
}
