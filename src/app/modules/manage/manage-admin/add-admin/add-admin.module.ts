import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAdminRoutingModule } from './add-admin-routing.module';
import { AddAdminComponent } from './add-admin.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedDialogBoxModule } from "../../../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../../../shared/shared-dialog-box/shared-dialog-box.component";
import { LogoutService } from "../../../../shared/logout.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
  imports: [
    CommonModule,
    AddAdminRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    SharedDialogBoxModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule
    
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [LogoutService],
  declarations: [AddAdminComponent]
})
export class AddAdminModule { }
