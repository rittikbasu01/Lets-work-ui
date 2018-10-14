import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from "./profile.component";



const routes: Routes = [
  
  {path : '', component : ProfileComponent},
  {path : 'bookings', loadChildren : './bookings/bookings.module#BookingsModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
