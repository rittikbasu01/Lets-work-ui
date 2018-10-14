import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { VenueDetailsService } from "../../../../services/venue-details.service";
import { Venue } from "../../../../models/venue.model";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";

@Component({
  selector: 'app-venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: ['./venue-detail.component.css']
})
export class VenueDetailComponent implements OnInit {
  VenueData: Venue;

  constructor(private route: ActivatedRoute,
              private venueDetailsService: VenueDetailsService,
              private httpSvc: HTTPRequestService, 
              private router : Router, 
              public dialog : MatDialog) { }
  id: any;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) {
      this.router.navigate(['home']);

    }
    this.httpSvc.get(`/api/v1/Venue/${this.id}`).subscribe((data: Venue) => {
      if (data) {
        this.VenueData = data;
        
      }
    }, error => {
      
      this.dialog.open(SharedDialogBoxComponent, {
        data : {
          value : 'Data not found'
        }
      });
      this.router.navigate(['home']);

      });
    //this.VenueData=this.venueDetailsService.GetVenueToBeDisplayed();

  }



}
