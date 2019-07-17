import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Experience } from '../../core/models/experience';
import { UIService } from '../../core/services/ui/ui.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-experience',
    templateUrl: 'create.experience.html',
})

export class CreateExperience {

    experience = new Experience;
    editExperience: boolean = false;
    todayDate: any;
    constructor(
        public dialogRef: MatDialogRef<CreateExperience>,
        private _experienceService: ExperienceService,
        private _uiService: UIService,
        private datePipe: DatePipe,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            console.log("data--------", data);
            if (data.type == "edit") {
                console.log('sssss');
                this.experience = data.experience;
                this.editExperience = true;
            }
            this.experience.groupId = data.groupId || "";
        }
        this.todayDate = this.datePipe.transform(new Date(), 'M/d/yy');
    }


    onNoClick(): void {
        this.dialogRef.close();
    }
    createExperience() {

        if (this.editExperience == true) {

            this._experienceService.updateExperience(this.experience, this.experience.id).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your experience has been updated successfully';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });


        } else {


            this._experienceService.createExperience(this.experience).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your experience has been successfully created';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });

        }


    }





}