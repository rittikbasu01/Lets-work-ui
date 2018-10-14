import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { SharedDialogBoxModule } from "../../shared/shared-dialog-box/shared-dialog-box.module";
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from "@angular/material/icon";
import { MatOptionModule, MatSelectModule } from "@angular/material";
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SharedDialogBoxModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule
   ],
  entryComponents:[SharedDialogBoxComponent],
  declarations: [ProfileComponent]

})
export class ProfileModule { }
