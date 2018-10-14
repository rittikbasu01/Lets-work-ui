import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageVenueRoutingModule } from './manage-venue-routing.module';
import { ManageVenueComponent } from './manage-venue.component';
import { HTTPRequestService } from "../../../services/httprequest.service";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { EditVenueService } from "../../../services/edit-venue.service";
import { VenueFilterPipe } from "../../../pipes/venue-filter.pipe";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    ManageVenueRoutingModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    SharedDialogBoxModule,
    NgxPaginationModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService, EditVenueService],
  declarations: [ManageVenueComponent, VenueFilterPipe]
})
export class ManageVenueModule { }
