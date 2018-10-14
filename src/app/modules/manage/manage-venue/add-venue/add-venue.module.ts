import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddVenueRoutingModule } from './add-venue-routing.module';
import { AddVenueComponent } from './add-venue.component';
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "../../../../services/httprequest.service";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "../../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "src/app/shared/logout.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    AddVenueRoutingModule,
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
    MatAutocompleteModule,
    MatDialogModule,
    SharedDialogBoxModule,
    MatProgressSpinnerModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService, LogoutService],
  declarations: [AddVenueComponent]
})
export class AddVenueModule { }
