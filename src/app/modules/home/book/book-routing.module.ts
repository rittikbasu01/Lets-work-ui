import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from "./book.component";

const routes: Routes = [
  { path : '', redirectTo : '/home' , pathMatch : 'full'},
  { path : ':id', component : BookComponent }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
