import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo : '/home',pathMatch:'full'},
  {path : 'active', loadChildren : './active/active.module#ActiveModule'},
  {path : 'closed', loadChildren : './closed/closed.module#ClosedModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
