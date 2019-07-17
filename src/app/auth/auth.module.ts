import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';

import { MaterialModule } from "../material/material.module";
import { AuthHeader } from "./header/auth-header.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { ResendVerificationComponent } from "./verfication/resend-verification.component";
import { VerificationComponent } from "./verfication/verification.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./forgot-password/reset-password.component";
import { AuthService } from '../core/services/auth/auth.service';
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule, RouterModule, ReactiveFormsModule,
        FormsModule, MaterialModule, SharedModule],
    declarations: [
        AuthHeader,
        LoginComponent,
        LogoutComponent,
        RegistrationComponent,
        ResendVerificationComponent,
        VerificationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
    ],
    providers: [AuthService]
})
export class AuthModule {

}