import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../core/models/user';
import { IAuthService } from '../core/services/auth/iauth.service';
import { UIService } from '../core/services/ui/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


declare var libraryVar: any;

@Component({
    selector: 'error',
    moduleId: module.id,
    templateUrl: 'not-found.component.html',
    styleUrls: ['other.component.css']
})
export class NotFoundComponent {
    currentURL: string;
    viewMore = false;
    isUser: User = new User();
    entityType: string;
    redirectUrl: string;
    isLogin: any;
    user: User = new User();



    constructor( @Inject('IAuthService') private _authService: IAuthService,
        private _uiService: UIService,
        public dialog: MatDialog,
        private route: ActivatedRoute, private _router: Router) {
        this.currentURL = window.location.href;

    }

    ngOnInit() {
        this.user = this._authService.getUser();
        this.isLogin = this._authService.isLoggedIn();
        console.log('main-----------');

    }

}