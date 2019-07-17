import { Component, OnInit, Inject, Input } from '@angular/core';
import { User } from '../core/models/user';
import { IAuthService } from '../core/services/auth/iauth.service';
import { UIService } from '../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageTypes } from '../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../core/services/experience/experience.service';
import { Groups } from '../core/models/groups';
import { Experience } from '../core/models/experience';
import { CreateExperience } from '../shared/create-experience/create.experience';
import { CreateGroup } from '../shared/create-group/create.group';
import { ConfirmDialog } from '../shared/confirmation-dialog/confirmation.dialog';




@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {


    isUser: User = new User();
    user: User = new User();
    isSpinner: boolean = true;
    redirectUrl: string;

    isLogin: any;
    showPaymentMessage = false;
    message;
    subscriptionAmount: number;
    subscription: any;
    Experiences: Array<any>;
    Groups: Array<Groups>;


    constructor(@Inject('IAuthService')
    private _authService: IAuthService,
        private _experienceService: ExperienceService,
        private _uiService: UIService,
        public dialog: MatDialog,
        private route: ActivatedRoute, private _router: Router) {

    }

    ngOnInit(): void {

        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();

        this.getExperience();
        this.getGroups();

    }

    getExperience() {
        this._uiService.showSpinner();
        this._experienceService.getAllExperienceByUser().subscribe(
            (res) => {
                this._uiService.hideSpinner();
                this.isSpinner = false;
                this.Experiences = res
                console.log("response from user experience and groups--- ", res);
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );
    }


    getGroups() {

        this._uiService.showSpinner();
        this._experienceService.getAllGroupByUser().subscribe(
            (res) => {
                this._uiService.hideSpinner();
                this.Groups = res
                console.log("response from user experience and groups--- ", res);
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );




    }

    navigateToSegment(type, e) {
        console.log('navigation ID', e);
        if (type == 'groupexperience') {
            this._router.navigate(['/group/experience'], { queryParams: { type: 'groupexperience', id: e.id } });
        } else if (type == 'individualexperience') {
            this._router.navigate(['/experience'], { queryParams: { type: 'individualexperience', id: e.id } });
        }


    }

    createGroup() {
        const dialogRef = this.dialog.open(CreateGroup, {
            width: '450px',

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getGroups();
        });
        console.log('c');
    }

    createExperience() {
        const dialogRef = this.dialog.open(CreateExperience, {
            width: '450px',
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getExperience();
            console.log('The dialog was closed');
        });
        console.log('e');
    }

    onlogOut() {
        this._authService.logoutUser();
        //this._router.navigate([this.redirectUrl]);
    }


    editExperience(e) {

        const dialogRef = this.dialog.open(CreateExperience, {
            width: '450px',
            data: { type: 'edit', experience: e }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.getExperience();
            console.log('The dialog was closed');
        });
        console.log('e');

    }

    deleteExperience(e) {

        const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '450px',
            data: { type: 'experience', experience: e }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getExperience();
        });
        console.log('c');

        // this.isSpinner = true;
        // this._experienceService.deleteExperience(e.id).subscribe(
        //     (res) => {
        //         this._uiService.hideSpinner();
        //         this.isSpinner = false;
        //         this.getExperience()
        //         console.log("response from user experience and groups--- ", res);
        //     },
        //     (err) => {
        //     }
        // );


    }


    editGroup(g: Groups) {
        const dialogRef = this.dialog.open(CreateGroup, {
            width: '450px',
            data: { type: 'edit', group: g }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getGroups();
        });
        console.log('c');
    }

    deleteGroup(g: Groups) {


        const dialogRef = this.dialog.open(ConfirmDialog, {
            width: '450px',
            data: { type: 'group', group: g}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.getGroups();
        });
        console.log('c');

        // this.isSpinner = true;
        // this._experienceService.deleteGroups(g.id).subscribe(
        //     (res) => {
        //         this._uiService.hideSpinner();
        //         this.isSpinner = false;
        //         this.getGroups()
        //         console.log("response from user experience and groups--- ", res);
        //     },
        //     (err) => {
        //     }
        // );

    }




}






