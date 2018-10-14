import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClosedComponent } from "./closed.component";

const routes: Routes = [
  {path : '', component : ClosedComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClosedRoutingModule { }
