import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageComponent } from "./manage.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AdminAuthGuard } from "src/app/guards/admin-auth.guard";

const routes: Routes = [
  {path : '', component : ManageComponent, children : [ 
    {path : '', component : DashboardComponent},
    {path : 'admin', loadChildren : './manage-admin/manage-admin.module#ManageAdminModule'},
    {path : 'booking', loadChildren : './manage-booking/manage-booking.module#ManageBookingModule'},
    {path : 'venue', loadChildren : './manage-venue/manage-venue.module#ManageVenueModule'}
  ], canActivateChild : [AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
