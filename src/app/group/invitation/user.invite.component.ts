import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Subject } from 'rxjs/Subject';
import { UIService } from '../../core/services/ui/ui.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/user';
import { Message, MessageTypes } from '../../core/models/message';


@Component({
    selector: 'app-groupinvite',
    templateUrl: './user.invite.component.html',
    // styleUrls: ['./user.invite.component.css']
})
export class UserInviteComponent implements OnInit {

    experienceId: string;
    email: string;
    groupId: string;
    action: string;
    User = new User();
    inviteId: string;
    Users = new Array<string>();
    GroupMembers = new Array<any>();
    groupName: string = '';
    Query = { member: [], groupId: "", invitedBy: "" };
    acceptQuery = { inviteId: "", userId: "", groupId: "" };
    delete = { userId: "", groupId: "", invitationId: "" };
    groupDetail: any;
    constructor(public dialog: MatDialog,
        private _router: Router, private route: ActivatedRoute,
        private _experienceService: ExperienceService,
        private _authService: AuthService,
        private _uiService: UIService,

    ) { }

    ngOnInit() {

        this.action = this.route.snapshot.queryParams["action"];
        this.inviteId = this.route.snapshot.queryParams["k"];
        this.groupId = this.route.snapshot.queryParams["groupId"] || "";

        console.log("invitiation-----", this.inviteId);
        console.log("group------", this.groupId);

        if (this.action == 'accpet' && this.inviteId && this.groupId) {
            this.acceptQuery.groupId = this.groupId;
            this.acceptQuery.inviteId = this.inviteId;
            this.acceptQuery.userId = this.User.id;
           
            this.acceptMember();
        } else if (this.action == 'reject' && this.inviteId) {

            this.rejectMember();
        }

        this.User = this._authService.getUser();
        if(this.User)
            this.Query.invitedBy = this.User.id;
        console.log('result----', this.Query);

        this.route.params.subscribe(params => {
            if (params) {
                this.Query.groupId = params.id
                this.groupId = params.id;
                this.getAllgroupMembers();
            }
        });

        this._experienceService.getGroupDetail(this.groupId).subscribe(
            (res) => {
                this.groupDetail = res;
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );


    }

    ngOnDestroy() {
        console.log('destroying..');

    }

    breadCrumslink(id, type){
        if(type == 'home')
          this._router.navigate(['home']);
        else if(type == 'group')
          this._router.navigate(['group/experience'], { queryParams: { type: 'groupexperience', id: id } });
        
      }
    

    addMembers() {
        this.Users.indexOf(this.email) === -1 ? this.Users.push(this.email) : ''
    }


    sent() {
        if(this.email.indexOf(';') === -1 )
            this.Users.push(this.email);
        else {
            var emails = this.email.split(';');
            emails.forEach(element => {
                this.Users.push(element);
            });
        }
        
        this.Query.member = this.Users;

        this._experienceService.inviteMembers(this.Query).subscribe(
            (res) => {
                const msg = new Message();
                msg.msg = 'Invitation has been send successfully!';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 4000;
                this._uiService.showToast(msg, 'info');
                this.getAllgroupMembers();
                this.Users = [];
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );

    }

    acceptMember() {
        console.log('accept calling');
        var query = this.acceptQuery;
        this._experienceService.AcceptGroupInvitation(this.acceptQuery).subscribe(
            (res) => {
                if (res != null) {

                    if (res.isNewUser == true && res.isUserAddedinGroup == false) {
                        this._router.navigate(['/registration'], { queryParams: { type: 'invitation', inviteId: this.inviteId, groupId: this.acceptQuery.groupId } });
                    } else {
                       // this._router.navigate(['/invite', {  id: this.acceptQuery.groupId }]);
                        this._router.navigateByUrl('/group/invite/' + this.acceptQuery.groupId);
                    }

                }
                console.log('res', res);
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );


    }

    rejectMember() {

        this._experienceService.RejectGroupInvitation(this.inviteId).subscribe(
            (res) => {
                this._router.navigateByUrl('/');
                console.log('res', res);
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );

        console.log('reject calling');
    }

    getAllgroupMembers() {

        this._experienceService.getAllGroupMembers(this.groupId).subscribe(
            (res) => {
                this.GroupMembers = res;
                if(this.GroupMembers)
                    //this.groupName = this.GroupMembers[0].groupName;

                console.log('group members', res);
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );

    }

    deleteMember(u: any) {
        console.log('usssss', u);
        this.delete.groupId = this.groupId;
        this.delete.userId = u.id;
        this.delete.invitationId = u.invitationId;
        this._experienceService.DeleteMember(this.delete).subscribe(
            (res) => {
                const msg = new Message();
                msg.msg = 'Group Member has been deleted successfully';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');

                this.getAllgroupMembers();
            },
            (err) => {
                this._uiService.hideSpinner();
            }
        );

    }

}



