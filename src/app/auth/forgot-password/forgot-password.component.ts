import { Component, Input, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { User } from '../../core/models/user';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Message, MessageTypes } from '../../core/models/message';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
    selector: 'forgot-password',
    moduleId: module.id,
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['../auth.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    user: User = new User();
    isEmailExist = true;
    isSubmitted = false;
    isSubmitStarted = false;
    emailSuccess = false;
    emailSuccessMsg: string = "";
    userId: "";

    gotoUrl: string;
    form: FormGroup;

    constructor(@Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService, private _router: Router,
        private route: ActivatedRoute, private fb: FormBuilder
    ) {
        this.form = fb.group({
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
        })
    }

    ngOnInit(): void {
        if (this.route.snapshot.queryParams["userid"]) {
            this.userId = this.route.snapshot.queryParams["userid"];
            console.log("user--id " ,this.userId);
        }

    }

    onSubmit() {

    }

    recoverPassword() {
        this.isSubmitted = true;

        const msg = new Message();
        this._authService.forgotPassword(this.user).subscribe(
            (res) => {
                // console.log("res",res.json());
                this.isSubmitted = false;
                this.emailSuccess = true;
                // msg.msg = res.json() ? res.json() : 'Successfully email sent';
                msg.msg = 'Successfully Email sent';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.emailSuccessMsg = msg.msg;

            },
            (err) => {
                // console.log(err);
                this.isSubmitted = false;
                this._authService.errStatusCheck(err);
            }
        );
    }

    onClickLogin() {
        // this.role = this.activatedRoute.snapshot.queryParams['role'];
        // this.role == 'brand' || this.role == 'influencer' ? this._router.navigate(['/ib-login']) : this._router.navigate(['/aa-login']);
        this._router.navigate(['/login']);
    }

}
