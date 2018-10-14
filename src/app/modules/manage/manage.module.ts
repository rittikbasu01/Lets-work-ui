import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "../../services/httprequest.service";
import { FormsModule } from "@angular/forms";
import { SharedDialogBoxModule } from "../../shared/shared-dialog-box/shared-dialog-box.module";
import { LogoutService } from "../../shared/logout.service";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";



@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule,
    SharedDialogBoxModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService, LogoutService],
  declarations: [ManageComponent, DashboardComponent]
})
export class ManageModule { }
