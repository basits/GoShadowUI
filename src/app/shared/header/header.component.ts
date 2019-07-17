import { Component, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { UIService } from '../../core/services/ui/ui.service';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs/Rx';
import { Message } from '../../core/models/message';

import { ISubscription } from "rxjs/Subscription";
import { MatSidenav, MatDialog } from '@angular/material';
import { NotesService } from '../../core/services/notes/notes.service';
import { Notes } from '../../core/models/notes';
import { SegmentDetailsComponent } from '../../experience/segments/segment.details.component';
import { ExperienceService } from '../../core/services/experience/experience.service';

@Component({
    selector: 'secure-header',
    moduleId: module.id,
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit {

    @ViewChild('sidenav')
    private sidenav: MatSidenav;
    events: string[] = [];
    opened: boolean;
    mode: string;
    NoteSegment = new Array<Notes>();
    isLogin: any;

    showNav: boolean;
    private updateInfo: ISubscription;

    User: User = new User();
    entityType: string;
    redirectUrl: string;
    profilePic: any;
    name: string;
    search: string;


    navShow = false;
    expandedIndex = -1;
    logo: any;
    overAllUnreadStatus = false;
    isShowMenu: boolean = false;
    Groups =[];
    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _uiService: UIService,
        private _noteService: NotesService,
        public dialog: MatDialog,
        private route: ActivatedRoute, private _router: Router,
        private _experienceService: ExperienceService
    ) { }

    ngOnInit(): void {
        this.mode = "side";
        this.User = this._authService.getUser();
        this.name = this.User.firstName;

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

    showMenu():void {
        this.isShowMenu = !this.isShowMenu
    }

    navigate(path) {
        
            
        this._router.navigateByUrl(path);
        this.showNav = !this.showNav;
    }

    logout() {
        this._authService.logoutUser();
    }

    onSearch() {
        this._router.navigate(['/search'], { queryParams: { keyword: this.search } });
        console.log('c');
    }

    showGroupDetail(g) {
        this._router.navigate(['/group/experience'], { queryParams: { type: 'groupexperience', id: g.id } });
    }
}
