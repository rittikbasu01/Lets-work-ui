import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditVenueRoutingModule } from './edit-venue-routing.module';
import { EditVenueComponent } from './edit-venue.component';
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "src/app/services/httprequest.service";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule, MatCardModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatRadioModule, MatSelectModule, MatProgressSpinnerModule } from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { LogoutService } from "../../../../shared/logout.service";
import { SharedDialogBoxModule } from "../../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";

@NgModule({
  imports: [
    CommonModule,
    EditVenueRoutingModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    SharedDialogBoxModule,
    MatProgressSpinnerModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService, LogoutService],
  declarations: [EditVenueComponent]
})
export class EditVenueModule { }
