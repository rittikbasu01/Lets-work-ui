import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import { EditComponent } from './edit/edit.component';
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { CalendarModule } from "primeng/components/calendar/calendar";
import { MatSelectModule } from "@angular/material/select";
import { SharedDialogBoxModule } from "../../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { MatDialogModule } from "@angular/material/dialog";
import { CustomDatePipe } from "../../../../pipes/custom-date.pipe";

@NgModule({
  imports: [
    CommonModule,
    ActiveRoutingModule,
    NgxPaginationModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    CalendarModule,
    MatSelectModule,
    MatDialogModule,
    SharedDialogBoxModule,
    
  ],
  entryComponents : [SharedDialogBoxComponent],
  declarations: [ActiveComponent, EditComponent]
})
export class ActiveModule { }
