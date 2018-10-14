import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './bookings.component';
import { BookingsRoutingModule } from "./bookings-routing.module";



@NgModule({
  imports: [
    CommonModule,
    BookingsRoutingModule
  ],
  declarations: [BookingsComponent]
})
export class BookingsModule { }
