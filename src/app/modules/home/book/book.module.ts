import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { DialogboxComponent } from "../../home/book/dialogbox/dialogbox.component";
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "../../../services/httprequest.service";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LogoutService } from "../../../shared/logout.service";

@NgModule({
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ],
  providers: [HTTPRequestService, LogoutService],
  entryComponents:[DialogboxComponent],
  declarations: [BookComponent, DialogboxComponent]
})
export class BookModule { }
