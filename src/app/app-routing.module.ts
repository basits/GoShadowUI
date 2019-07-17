import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';
import { LoginComponent } from './auth/login/login.component';

import { ResendVerificationComponent } from './auth/verfication/resend-verification.component';
import { VerificationComponent } from './auth/verfication/verification.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/forgot-password/reset-password.component';

import { NotFoundComponent } from './others/not-found.component';
import { PermissionDeniedComponent } from './others/permission.denied.component';
import { LogoutComponent } from './auth/logout/logout.component';

import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ExperienceInfoComponent } from './experience/info/experience.info.component';
import { SegmentDetailsComponent } from './experience/segments/segment.details.component';
import { NotesInfoComponent } from './experience/notes/notes.info';
import { GroupExperienceInfoComponent } from './group/info/group.experience.component';
import { ExperienceDetailComponent } from './experience/detail/experience.detail.component';
import { RefrenceInfoComponent } from './experience/refrence/refrence.info';
import { GroupDetailComponent } from './group/detail/group.detail.component';
import { UserInviteComponent } from './group/invitation/user.invite.component';
import { SearchComponent } from './experience/search/search.component';


import { FaqComponent } from './shared/faq/faq.component';
import { FeedbackComponent } from './shared/feedback/feedback.component';
import { HowtouseComponent } from './shared/howtouse/howtouse.component';
import { PrivacytermComponent } from './shared/privacyterm/privacyterm.component';
import { SupportComponent } from './shared/support/support.component';



const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CanActivateViaMainGuard],
    children: [],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    children: []
  },
  {
    path: 'search',
    component: SearchComponent,
    children: []
  },
  {
    path: 'verification',
    component: VerificationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'resend-verification',
    component: ResendVerificationComponent,
    canActivate: [CanActivateViaMainGuard],
    children: []
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [],
    children: []
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [],
    children: []
  },


  {
    path: 'experience',
    component: ExperienceInfoComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: []
  },

  {
    path: 'experience/:id',
    component: ExperienceInfoComponent,
    children: []
  },

  {
    path: 'create/task',
    component: RefrenceInfoComponent,
    children: []
  },


  {
    path: 'group/experience',
    component: GroupExperienceInfoComponent,
    children: []
  },

  {
    path: 'group/experience/:id',
    component: GroupExperienceInfoComponent,
    children: []
  },


  {
    path: 'all/experience',
    component: ExperienceDetailComponent,
    children: []
  },

  {
    path: 'group/invite/:id',
    component: UserInviteComponent,
    children: []
  },

  {
    path: 'group/invitation',
    component: UserInviteComponent,
    children: []
  },



  {
    path: 'all/groups',
    component: GroupDetailComponent,
    children: []
  },

  {
    path: 'segments/:id',
    component: SegmentDetailsComponent,
    children: []
  },

  {
    path: 'segment/notes/:id',
    component: NotesInfoComponent,
    children: []
  },


  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    // pathMatch: 'full',
    // component: HomeComponent,
    //canActivate: [CanActivateViaAuthGuard],
    // children: []
  },

  {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
    canActivate: [CanActivateViaAuthGuard],
    // children: []
  },

  {
    path: 'error',
    component: NotFoundComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },

  {
    path: 'permission',
    component: PermissionDeniedComponent,
    // canActivate: [CanActivateViaAuthGuard],
    children: []
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'howtouse',
    component: HowtouseComponent
  },
  {
    path: 'support',
    component: SupportComponent
  },
  {
    path: 'privacyterm',
    component: PrivacytermComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    children: []
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
