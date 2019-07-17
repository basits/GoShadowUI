import { Component, OnInit, Inject, Input } from '@angular/core';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Groups } from '../../core/models/groups';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-group',
    templateUrl: 'create.group.html',
})

export class CreateGroup {

    group = new Groups;
    editGroup: boolean = false;
    todayDate: any;
    constructor(
        public dialogRef: MatDialogRef<CreateGroup>,
        private _experienceService: ExperienceService,
        private _uiService: UIService,
        private datePipe: DatePipe,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            console.log("data--------", data);
            if (data.type == "edit") {
                this.group = data.group;
                this.editGroup = true;
            }
        }

        this.todayDate = this.datePipe.transform(new Date(), 'M/d/yy');
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
    createGroup() {

        if (this.editGroup == true) {

            this._experienceService.updateGroup(this.group , this.group.id).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your Group has been updated created';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });


        } else {

            console.log('experience name-----', this.group);

            this._experienceService.createGroup(this.group).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your Group has been successfully created';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });


        }


    }

}