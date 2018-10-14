import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClosedRoutingModule } from './closed-routing.module';
import { ClosedComponent } from './closed.component';
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "../../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { CustomDatePipe } from "../../../../pipes/custom-date.pipe";

@NgModule({
  imports: [
    CommonModule,
    ClosedRoutingModule,
    MatButtonModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CalendarModule,
    MatSelectModule,
    MatDialogModule,
    SharedDialogBoxModule
    
  ],
  entryComponents : [SharedDialogBoxComponent],
  declarations: [ClosedComponent]
})
export class ClosedModule { }
