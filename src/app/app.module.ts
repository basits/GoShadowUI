import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthModule } from "./auth/auth.module";
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { UserFilterPipe } from './pipes/user-filter.pipe';

import { MainModule } from './main/main.module';


import { NotFoundComponent } from './others/not-found.component';
import { PermissionDeniedComponent } from './others/permission.denied.component';
import { DatePipe } from '@angular/common';

import { CanActivateViaAuthGuard } from './core/security/auth.guard';
import { CanActivateViaMainGuard } from './core/security/main.page.gurad';
import { SharedModule } from './shared/shared.module';
import { ExperienceModule } from './experience/experience.module';
import { GroupModule } from './group/group.module';
import { CountdownModule } from 'ngx-countdown';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    PermissionDeniedComponent,
    UserFilterPipe

  ],
  imports: [
    MainModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    CountdownModule,
    SharedModule,
    ExperienceModule,
    GroupModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    // MatIconModule,
    AppRoutingModule,

  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/' + (environment.webAppUrl || '')
    },
    CanActivateViaAuthGuard,
    CanActivateViaMainGuard,
    DatePipe
  ],
  bootstrap: [AppComponent],


})
export class AppModule { }
