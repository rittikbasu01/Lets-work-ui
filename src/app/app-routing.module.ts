import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./guards/auth.guard";
import { AdminAuthGuard } from "./guards/admin-auth.guard";
import { ProfileAuthGuard } from "./guards/profile-auth.guard";


const routes: Routes = [
  { path : '' , redirectTo : '/home', pathMatch : 'full'},
  { path : 'home', loadChildren : './modules/home/home.module#HomeModule'},
  { path : 'signin', loadChildren : './modules/sign-in/sign-in.module#SignInModule'},
  { path : 'signin/:id', loadChildren : './modules/sign-in/sign-in.module#SignInModule'},
  { path : 'signup', loadChildren : './modules/sign-up/sign-up.module#SignUpModule'},
  { path : 'manage', loadChildren : './modules/manage/manage.module#ManageModule', canActivate : [AdminAuthGuard]},
  { path : 'verify/:id', loadChildren :'./modules/verify-email/verify-email.module#VerifyEmailModule'},
  { path : 'profile/:id', loadChildren : './modules/profile/profile.module#ProfileModule',canActivate : [ProfileAuthGuard]},
  { path : 'change-password/:id', loadChildren : './modules/change-password/change-password.module#ChangePasswordModule' },
  { path : 'forgot-password/:id', loadChildren : './modules/forgot-password/forgot-password.module#ForgotPasswordModule'},
  { path : 'password-reset', loadChildren : './modules/password-recovery/password-recovery.module#PasswordRecoveryModule'},

  { path : '**' , loadChildren : './modules/page-not-found/page-not-found.module#PageNotFoundModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
