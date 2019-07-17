import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';

import { AuthService } from '../../core/services/auth/auth.service';

import { UIService } from '../../core/services/ui/ui.service';
import { UserService } from '../../core/services/user/user.service';


import { Router, ActivatedRoute } from '@angular/router'
import { Message, MessageTypes } from "../../core/models/message";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { User } from '../../core/models/user';
import { ExperienceService } from '../../core/services/experience/experience.service';

@Component({
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    styleUrls: []
})

export class RegistrationComponent implements OnInit {

    patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    patternName = /^[A-Za-z ]+$/;
    passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\"()\[\]-]{8,20}$/;

    phide = true;
    cphide = true;

    isMatchPass = true;

    filteredDesignations: any;
    filteredDepartments: any;
    filteredRoles: any;
    filteredCountries: any;
    filteredRegions: any;
    filteredCities: any;
    filteredBranches: any;


    user: User = new User();
    userId: string;
    successResponse: any;
    errorResponse: any;
    signin: boolean;
    type: string;
    inviteId: string;
    groupId: string;
    isSubmitted: boolean = false;
    formRegister: FormGroup;
    inviteQuery = { inviteId: "", userId: "", groupId: "" };

    MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if (confirmPassword) {
            if (password != confirmPassword) {
                console.log('false');
                AC.get('confirmPassword').setErrors({ matchPassword: true });
            } else {
                console.log('true');
                AC.get('confirmPassword').setErrors(null)
                return null
            }
        }
    }

    constructor(
        private _authServices: AuthService,
        private _router: Router,
        private route: ActivatedRoute,
        private _uiServices: UIService,
        private _experienceService: ExperienceService,
        private _userService: UserService,
        private fb: FormBuilder

    ) {

        this.formRegister = fb.group({

            'firstName': [this.user.firstName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'lastName': [this.user.lastName, Validators.compose([Validators.required, Validators.pattern(this.patternName)])],
            'email': [this.user.email, Validators.compose([Validators.required, Validators.email])],
            'password': [this.user.password, Validators.compose([Validators.required, Validators.maxLength(20), Validators.pattern(this.passwordPattern)])],
            'confirmPassword': [this.user.confirmPassword, Validators.compose([Validators.required])],
            'organizationName': [this.user.organizationName, Validators.compose([Validators.required])]

        }, {
                validator: this.MatchPassword // your validation method

            }
        );


    }


    ngOnInit(): void {

        this.type = this.route.snapshot.queryParams["type"];
        this.inviteId = this.route.snapshot.queryParams["inviteId"];
        this.groupId = this.route.snapshot.queryParams["groupId"];

        this.inviteQuery.groupId = this.groupId;
        this.inviteQuery.inviteId = this.inviteId;
        this.inviteQuery.userId = "";

    }

    onSubmit() {

        if (this.formRegister.valid) {
            this.isSubmitted = true;
            const msg = new Message();
            this._authServices.register(this.user).subscribe(
                (res) => {
                    this.isSubmitted = false;
                    this.userId = res.id;
                    this._authServices.storeUser(this.user);
                    msg.msg = res.json() ? res.json() : 'You have successfully signed up';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiServices.showToast(msg, 'info');
                    this._router.navigate(['/login']);



                    this._experienceService.AddNewMembers(this.inviteQuery).subscribe(
                        (res) => {
                            console.log('new user register and added in group members', res);
                        },
                        (err) => {
                        }
                    );




                },
                (err) => {
                    console.log(err);
                    this.isSubmitted = false;
                    this._authServices.errStatusCheck(err);
                }
            );





        }
        else {
            this.validateAllFormFields(this.formRegister);
        }

    }

    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

}