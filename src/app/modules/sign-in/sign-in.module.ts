import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HTTPRequestService } from "src/app/services/httprequest.service";
import { HttpClientModule } from "@angular/common/http";
import { RedirectService } from "../../services/redirect.service";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { SharedDialogBoxModule } from "../../shared/shared-dialog-box/shared-dialog-box.module";
import { SharedDialogBoxComponent } from "../../shared/shared-dialog-box/shared-dialog-box.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    CommonModule,
    SignInRoutingModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatCheckboxModule,
    SharedDialogBoxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SocialLoginModule
  ],
  entryComponents : [SharedDialogBoxComponent],
  providers : [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  },HTTPRequestService, RedirectService] ,
  declarations: [SignInComponent]
})
export class SignInModule { }
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("350310165471-rhvfrn9tit8bdhqgaiobt16gmuq5fr64.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}