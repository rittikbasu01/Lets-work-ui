import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BookModule } from "./book/book.module";
import { SearchModule } from "./search/search.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ViewVenueService } from "../../services/view-venue.service";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "src/app/shared/shared-dialog-box/shared-dialog-box.module"; 
import {CalendarModule} from 'primeng/calendar';
import { BookingService } from "../../services/booking.service";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    SharedDialogBoxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    CalendarModule
    
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [ViewVenueService, BookingService],
  declarations: [HomeComponent]
})
export class HomeModule { }
