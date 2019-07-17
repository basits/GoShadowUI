import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Experience } from '../../core/models/experience';
import { UIService } from '../../core/services/ui/ui.service';
import { Groups } from '../../core/models/groups';
import { Segment } from '../../core/models/segment';
import { NotesService } from '../../core/services/notes/notes.service';


@Component({
    selector: 'confirm-dialog',
    templateUrl: 'confirmation.dialog.html',
})

export class ConfirmDialog {

    experience = new Experience;
    type: string;
    group = new Groups;
    segment = new Segment;
    noteId: string;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDialog>,
        private _experienceService: ExperienceService,
        private _noteService: NotesService,
        private _uiService: UIService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            this.type = data.type || "";
            this.experience = data.experience || "";
            this.group = data.group || "";
            this.segment = data.segment || "";
            this.noteId = data.noteId || "";

            
        }
    }


    onNoClick(): void {
        this.dialogRef.close();
    }


    onYesClick(field) {

        if (field === 'experience') {
            this._experienceService.deleteExperience(this.experience.id).subscribe(
                (res) => {
                    const msg = new Message();
                    msg.msg = 'Experience has deleted successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close();
                },
                (err) => {
                    console.log(err);
                    const msg = new Message();
                    msg.msg = 'Sorry, an error has occured';
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }

        if (field === 'group') {
            this._experienceService.deleteGroups(this.group.id).subscribe(
                (res) => {
                    const msg = new Message();
                    msg.msg = 'Group has deleted successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close();
                },
                (err) => {
                    console.log(err);
                    const msg = new Message();
                    msg.msg = 'Sorry, an error has occured';
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');
                });
        }

        if (field === 'segment') {
            this._experienceService.deleteSegment(this.segment.id).subscribe(
                (res) => {
                    const msg = new Message();
                    msg.msg = 'Segment has deleted successfully';
                    msg.msgType = MessageTypes.Information;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, 'info');
                    this.dialogRef.close();
                },
                (err) => {
                    // console.log(err);
                    // const msg = new Message();
                    // msg.msg = 'Sorry, an error has occured';
                    // msg.msgType = MessageTypes.Error;
                    // msg.autoCloseAfter = 400;
                    // this._uiService.showToast(msg, '');
                    this.dialogRef.close();
                });
        }

        if (field === 'note') {

            this._noteService.deleteNote(this.noteId).subscribe((res) => {

                const msg = new Message();
                msg.msg = 'Note has deleted successfully';
                msg.msgType = MessageTypes.Information;
                msg.autoCloseAfter = 400;
                this._uiService.showToast(msg, 'info');
                this.dialogRef.close();
            },
                (err) => {
                    console.log(err);
                    const msg = new Message();
                    msg.msg = 'Sorry, an error has occured';
                    msg.msgType = MessageTypes.Error;
                    msg.autoCloseAfter = 400;
                    this._uiService.showToast(msg, '');


                })


        }

    }






}