import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBookingComponent } from "./manage-booking.component";

const routes: Routes = [
  {path : '', component : ManageBookingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBookingRoutingModule { }
