import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdminRoutingModule } from './manage-admin-routing.module';
import { ManageAdminComponent } from './manage-admin.component';
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { HTTPRequestService } from "src/app/services/httprequest.service";
import { AdminSearchFilter } from "src/app/pipes/admin-search.pipe";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { SharedDialogBoxModule } from "../../../shared/shared-dialog-box/shared-dialog-box.module";
import { LogoutService } from "../../../shared/logout.service";
import { SharedDialogBoxComponent } from "../../../shared/shared-dialog-box/shared-dialog-box.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { NgxPaginationModule } from "ngx-pagination/dist/ngx-pagination";

@NgModule({
  imports: [
    CommonModule,
    ManageAdminRoutingModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    SharedDialogBoxModule,
    MatIconModule,
    NgxPaginationModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [HTTPRequestService, LogoutService],
  declarations: [ManageAdminComponent, AdminSearchFilter]
})
export class ManageAdminModule { }
