import { Component, OnInit } from '@angular/core';
import { Venue } from "../../../models/venue.model";
import { EditVenueService } from "../../../services/edit-venue.service";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../shared/logout.service";

@Component({
  selector: 'app-manage-venue',
  templateUrl: './manage-venue.component.html',
  styleUrls: ['./manage-venue.component.css']
})
export class ManageVenueComponent implements OnInit 
{
  
p:number;
venues:Venue[];
searchText:string="";
searchCity : string ="";
  InActive:boolean=true;
  constructor(private _editVenueService:EditVenueService,
    private _httpService:HTTPRequestService, private router : Router, private dialog : MatDialog, private logoutSvc : LogoutService) 
  { 

  }
  
  //Load venues
  ngOnInit()
   {
     this.InActive=true;
     this._httpService.get('/api/v1/Venue', this.generateHeaders()).subscribe( (data : Venue[]) => 
     {
       //change this
      this.venues=data;
       
     }, 
      error => 
      {
        if(error.status === 401)
        {
          this.dialog.open(SharedDialogBoxComponent, {
            data : {
              value : `Session Timed Out.Login again`
            }
          });
          this.logoutSvc.logout();
        }
      });
  
  }
  generateHeaders() : HttpHeaders
  {
    let token : string ="";
    if(localStorage.getItem('access_token'))
    {
      token = localStorage.getItem('access_token');
    }
    return new HttpHeaders().set('Authorization',`Bearer ${token}`);
  } 
  //Redirection to edit venue page
  gotoEditVenue(venueToBeEdited:Venue)
  {
    this._editVenueService.UpdateVenueToBeEdited(venueToBeEdited)
    this.InActive=false;
    this.router.navigate([`/manage/venue/edit/${venueToBeEdited.VenueID}`]);
  }

  goToAddVenue()
  {
    this.router.navigate(['/manage/venue/add']);
  }

}
