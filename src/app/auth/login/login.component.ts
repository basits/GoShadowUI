import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UIService } from '../../core/services/ui/ui.service'
import { AuthService } from '../../core/services/auth/auth.service'
import { UserService } from '../../core/services/user/user.service'
import { User } from '../../core/models/user'
import { Router, ActivatedRoute } from '@angular/router';
import { Message, MessageTypes } from "../../core/models/message";
import { MaterialModule } from '../../material/material.module';


@Component({
    selector: 'login',
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: []
})
export class LoginComponent implements OnInit, OnDestroy {

    Mainpage = "none";
    Loginpage = "block";
    Loadingpage = "none";
    signin: boolean;
    user: User = new User();
    loginUser: User = new User();
    successResponse: any;
    errorResponse: any;
    errMsg: string;
    isSubmitted: boolean = false;
    userId : string;

    formLogin = new FormGroup({
        'email': new FormControl(this.user.email, [Validators.required, Validators.email]),
        'password': new FormControl(this.user.password, [Validators.required]),
    });
    constructor(
        private _authServices: AuthService,
        private _uiServices: UIService,
        private _router: Router,
        private route: ActivatedRoute,
        private _userService: UserService
    ) { }

    Mainpagecreateaccount() {
        this._router.navigate(['/registration']);
    }
    // emailFocus()
    // {
    //     this.user.email= this.user.email.toLocaleLowerCase();
    // }

    Mainpagesignin() {
        this.Mainpage = "none";
        this.Loginpage = "block";
    }

    ngOnInit(): void {

        if (this.route.snapshot.queryParams['userid']) {
            this.userId = this.route.snapshot.queryParams['userid'];
            this.activateUser();
        }


        if (this._authServices.isLoggedIn()) {
            this._router.navigate(['/home']);
        }
    }

    onEmailFocusOut() {
        this.user.email = (this.user.email && this.user.email.length > 0 ? this.user.email.trim() : this.user.email);
    }

    login(): void {

        if (this.formLogin.invalid) {
            let msg = new Message();
            msg.title = ""
            msg.iconType = ""

            if (this.formLogin.controls['email'].hasError('required') && this.formLogin.controls['password'].hasError('required')) {
                msg.msg = "Email and password are required."
            }
            else if (this.formLogin.controls['email'].hasError('required')) {
                msg.msg = "Email is required."
            }
            else if (this.formLogin.controls['email'].hasError('email')) {
                msg.msg = "Invalid email address."
            }
            else if (this.formLogin.controls['email'].hasError('pattern')) {
                msg.msg = "Invalid email address."
            }
            else if (this.formLogin.controls['password'].hasError('required')) {
                msg.msg = "Password is required."
            }
            this._uiServices.showToast(msg, '');

        }
        else {
            this.Loginpage = "none";
            this.Loadingpage = "block";
            this.isSubmitted = true;
            this.user.email = this.user.email.toLocaleLowerCase();

            this._authServices.checkLogin(this.user).subscribe(
                (res) => {
                    if (res != null) {
                        this._router.navigate(['/home']);
                    }
                },
                (err) => {
                    console.log('err', err);
                    this.isSubmitted = false;
                    this._authServices.errStatusCheck(err);
                }
            );
        }
    }

    onForgetPassword() {
        this._router.navigateByUrl('forgot-password');
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }

    activateUser() {

        this._authServices.activateUser(this.userId).subscribe(
            (res) => {
                console.log('activate user')
            },
            (err) => {
                console.log('err', err);
                this.isSubmitted = false;
                this._authServices.errStatusCheck(err);
            }
        );
    }



}
