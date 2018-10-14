import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDialogBoxComponent} from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { FormsModule } from "@angular/forms";
import { CustomDatePipe } from "src/app/pipes/custom-date.pipe";
@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [SharedDialogBoxComponent,CustomDatePipe],
  exports : [CustomDatePipe]
})
export class SharedDialogBoxModule { }
