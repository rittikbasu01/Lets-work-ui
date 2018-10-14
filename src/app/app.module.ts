import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { VenueFilterPipe } from './pipes/venue-filter.pipe';
import { RedirectService } from "../app/services/redirect.service";
import {HeaderComponent} from "../app/header/header.component";
import {FooterComponent} from "../app/footer/footer.component";
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from "@angular/common/http";
import { LogoutService } from "./shared/logout.service";
import { VenueSearchFilterPipe } from './pipes/venue-search-filter.pipe';
import { SharedDialogBoxComponent } from './shared/shared-dialog-box/shared-dialog-box.component';
import { SharedDialogBoxModule } from "./shared/shared-dialog-box/shared-dialog-box.module";
import { BookingFilterPipe } from './pipes/booking-filter.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SearchFilterPipe,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatMenuModule,
    SharedDialogBoxModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    
  ],
  
  entryComponents : [SharedDialogBoxComponent],
  providers : [LogoutService, RedirectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
