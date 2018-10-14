import { Injectable } from '@angular/core';
import { Venue } from "../models/venue.model";

@Injectable({
providedIn: 'root'
})
export class EditVenueService {

constructor() { }
VenueToBeEdited:Venue;
public GetVenueToBeEdited():Venue
{
return this.VenueToBeEdited;
}
public UpdateVenueToBeEdited(venue:Venue)
{
this.VenueToBeEdited=venue;
}
} 
 
