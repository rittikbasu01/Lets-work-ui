import { Injectable } from '@angular/core';
import { Venue } from "../models/venue.model";

@Injectable({
  providedIn: 'root'
})
export class VenueDetailsService {
  venue:Venue;
  constructor() { }
  public SetVenueToBeDisplayed(venue:Venue)
  {
    this.venue=venue;      
  }
  public GetVenueToBeDisplayed():Venue
  {
    return this.venue;      
  }
}
