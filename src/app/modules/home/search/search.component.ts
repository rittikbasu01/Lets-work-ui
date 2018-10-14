import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";
import { Venue } from "src/app/models/venue.model";
import { ViewVenueService } from "../../../services/view-venue.service";
import { VenueDetailsService } from "../../../services/venue-details.service";
import { RedirectService } from "../../../services/redirect.service";
import { ConfirmExitComponent } from "../../../shared/confirm-exit/confirm-exit.component";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  p:number;
  Venue: Venue[];
  searchText: string;
  roomTypes = ['Meeting Room', 'Board Room', 'Conference Room'];
  wirelessNetworkTypes : Array<string> = new Array<string>('802.11ac', '802.11b', '802.11g', '802.11n', 'None');
  roomValue : string ="";
  wifiValue : string = "";
  acValue : string = "";
  coffeeVendingMachine : boolean = false;
  waterVendingMachine : boolean = false;
  foodVendingMachine : boolean = false;
  wifiNetworkType : string = "";
  constructor(private router: Router, private viewVenue: ViewVenueService, private venueDetailsService: VenueDetailsService, private redirectSvc: RedirectService, public dialog : MatDialog) {

  }

  ngOnInit() {
    if(!this.viewVenue.GetVenues)
    {
      this.router.navigate(['home']);
    }
    this.Venue = this.viewVenue.GetVenues;

  }
  checkLogin(): boolean {
    if (localStorage.getItem('access_token') && localStorage.getItem('role') && localStorage.getItem('role') === "User") {
      return true;
    }
    else {
      return false;
    }
  }
  onBooking(VenueID : string) {

    if(localStorage.getItem('access_token') && !localStorage.getItem('email'))
      {
        this.dialog.open(SharedDialogBoxComponent)
      }

    if (this.checkLogin()) {
      this.router.navigate([`/home/book/${VenueID}`]);
    }
    else {
      localStorage.setItem('source', '1');
      this.redirectSvc.SetRequestSource = `/home/book/${VenueID}`;
      
      this.router.navigate([`signin/${VenueID}`]);
    }

  }
  showDetails(venueID : string) {
    
    this.router.navigate([`/home/search/${venueID}`]);
  }
  
}
