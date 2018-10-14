import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageVenueComponent } from "./manage-venue.component";

const routes: Routes = [
  {path : '', component : ManageVenueComponent},
  {path : 'add', loadChildren : './add-venue/add-venue.module#AddVenueModule'},
  {path : 'edit/:id', loadChildren : './edit-venue/edit-venue.module#EditVenueModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageVenueRoutingModule { }
