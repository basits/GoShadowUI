import { Component, OnInit, Inject, Input } from '@angular/core';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Segment } from '../../core/models/segment';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'create-segment',
    templateUrl: 'create.segment.html',
})

export class CreateSegment {

    segment = new Segment;
    editSegment: boolean = false;
    todayDate: any;
    constructor(
        public dialogRef: MatDialogRef<CreateSegment>,
        private _experienceService: ExperienceService,
        private _uiService: UIService,
        private datePipe: DatePipe,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        if (data.type == 'edit') {
            this.editSegment = true;
            this.segment = data.segment
        }
        this.todayDate = this.datePipe.transform(new Date(), 'M/d/yy');
        this.segment.experienceId = data.experienceId;
        console.log("data from child ======", this.segment);
    }



    onNoClick(): void {
        this.dialogRef.close();
    }
    createSegment() {

        if (this.editSegment == true) {


            this._experienceService.updateSegment(this.segment , this.segment.id).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your Segment has been updated ';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 4000;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });



        } else {

            console.log('segment name-----', this.segment);

            this._experienceService.createSegment(this.segment).subscribe((res) => {
                console.log('response----', res);
                this.dialogRef.close();
                const msg = new Message();
                msg.msg = 'Your Segment has been successfully created';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 4000;
                this._uiService.showToast(msg, 'info');
            }, (err) => { });


        }


    }

}