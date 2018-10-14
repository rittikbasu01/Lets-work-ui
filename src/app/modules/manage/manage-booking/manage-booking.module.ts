import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBookingRoutingModule } from './manage-booking-routing.module';
import { ManageBookingComponent } from './manage-booking.component';
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { FormsModule } from "@angular/forms";
import { BookingFilterPipe } from "../../../pipes/booking-filter.pipe";
import { MatInputModule } from "@angular/material/input";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    ManageBookingRoutingModule,
    HttpClientModule,
    MatDialogModule,
    SharedDialogBoxModule,
    FormsModule,
    MatInputModule,
    NgxPaginationModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService],
  declarations: [ManageBookingComponent, BookingFilterPipe]
})
export class ManageBookingModule { }
