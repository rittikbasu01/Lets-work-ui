import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmExitComponent } from './confirm-exit.component';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [ConfirmExitComponent]
})
export class ConfirmExitModule { }
