import { NgModule } from '@angular/core';
import { NavComponent } from "./nav/nav.component";
import { SpinComponent } from "./spin/spin.component";
// import { BrowserModule } from "@angular/platform-browser";
import { ToastComponent } from "./toast/toast.component";


// import { MaterialModule } from ".././material/material.module";
import { MaterialModule } from "../material/material.module";
// import { MatIconModule } from "@angular/material/icon";
// import { MatProgressBarModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EqualValidator } from './directives/equal-validator.directive';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderNotificationComponent } from './notification/header.notification.component';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { from } from 'rxjs/observable/from';

// Import ng-circle-progress
import { CreateExperience } from './create-experience/create.experience';
import { CreateGroup } from './create-group/create.group';
import { CreateSegment } from './create-segment/create.segment';
import { CreateNote } from './create-note/create.note';
import { ConfirmDialog } from './confirmation-dialog/confirmation.dialog';
import { HttpClientModule } from '@angular/common/http';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { FaqComponent } from './faq/faq.component';
import { SupportComponent } from './support/support.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { PrivacytermComponent } from './privacyterm/privacyterm.component';




@NgModule({
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        // MatIconModule, 
        // MatProgressBarModule,
        CommonModule, RouterModule,
        CollapseModule.forRoot(), BsDropdownModule.forRoot(),
        // NgCircleProgressModule.forRoot({
        //     // set defaults here
        //     // radius: 100,
        //     // outerStrokeWidth: 16,
        //     // innerStrokeWidth: 8,
        //     // outerStrokeColor: "#78C000",
        //     // innerStrokeColor: "#C7E596",
        //     // animationDuration: 300
        // })
    ],

    declarations: [EqualValidator,
        NavComponent, SpinComponent,
        ToastComponent,
        HeaderComponent, SidebarComponent,
        CreateExperience,
        CreateGroup,
        CreateSegment,
        CreateNote,
        ConfirmDialog,
        HeaderNotificationComponent, FooterComponent, HowtouseComponent, FaqComponent, SupportComponent, FeedbackComponent, PrivacytermComponent
    ],

    exports: [
        NavComponent, SpinComponent,
        ToastComponent, CommonModule,
        HeaderComponent, SidebarComponent,
        HeaderNotificationComponent, FooterComponent
    ],

    entryComponents: [CreateExperience, CreateGroup, CreateSegment, CreateNote, ConfirmDialog]
})
export class SharedModule {
}