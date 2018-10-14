import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { VenueDetailComponent } from "../../../modules/home/search/venue-detail/venue-detail.component";
import { HomeSearchPipe } from "../../../pipes/home-search.pipe";
import { VenueDetailsService } from "../../../services/venue-details.service";
import { MatRadioModule } from "@angular/material/radio";
import { VenueSearchFilterPipe } from "../../../pipes/venue-search-filter.pipe";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { ConfirmExitModule } from "../../../shared/confirm-exit/confirm-exit.module";
import { ConfirmExitComponent } from "../../../shared/confirm-exit/confirm-exit.component";
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    ConfirmExitModule,
    NgxPaginationModule
  ],
  entryComponents : [ConfirmExitComponent],
  providers : [VenueDetailsService],
  declarations: [SearchComponent, VenueDetailComponent, HomeSearchPipe, VenueSearchFilterPipe]
})
export class SearchModule { }
