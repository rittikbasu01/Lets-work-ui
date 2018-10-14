import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { AuthGuard } from "src/app/guards/auth.guard";

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'book', loadChildren : './book/book.module#BookModule', canActivate : [AuthGuard]},
  {path : 'search', loadChildren : './search/search.module#SearchModule'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
