import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageAdminComponent } from "./manage-admin.component";

const routes: Routes = [
  {path : '', component : ManageAdminComponent},
  {path :'add', loadChildren : './add-admin/add-admin.module#AddAdminModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageAdminRoutingModule { }
