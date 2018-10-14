import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from "./search.component";
import { VenueDetailComponent } from "../../home/search/venue-detail/venue-detail.component";

const routes: Routes = [
  {path : '', component : SearchComponent},
  {path : ':id', component : VenueDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
