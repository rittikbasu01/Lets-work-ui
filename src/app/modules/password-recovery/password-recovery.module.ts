import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordRecoveryRoutingModule } from './password-recovery-routing.module';
import { PasswordRecoveryComponent } from "./password-recovery.component";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { SharedDialogBoxModule } from "../../shared/shared-dialog-box/shared-dialog-box.module";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    PasswordRecoveryRoutingModule,
    SharedDialogBoxModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  declarations: [PasswordRecoveryComponent]
})
export class PasswordRecoveryModule { }
