import { Component, OnInit, Inject, Input } from '@angular/core';
import { Message, MessageTypes } from '../../core/models/message';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { UIService } from '../../core/services/ui/ui.service';
import { Notes } from '../../core/models/notes';
import { NotesService } from '../../core/services/notes/notes.service';
import { HttpClient } from '@angular/common/http';
import { HttpEventType, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';



@Component({
    selector: 'create-note',
    templateUrl: 'create.note.html',
})

export class CreateNote {

    Note = new Notes();
    message: string;
    progress: number;
    constructor(
        public dialogRef: MatDialogRef<CreateNote>,
        private http: HttpClient,
        private _experienceService: ExperienceService,
        private _uiService: UIService,
        private _noteService: NotesService,

        @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {

            this.Note.segmentId = data.segmentId || "";
        }

        console.log("data from child ======", this.Note);
    }



    onNoClick(): void {
        this.dialogRef.close();
    }
    createNote() {

        let url = this.getFullUrl('notes');
        console.log('segment name-----', this.Note);
        this.Note.type = null;

        // const formData = new FormData();
        // formData.append("segmentId", this.Note.segmentId);
        // formData.append("Text", this.Note.text);
        // formData.append("Type", this.Note.type);


        // const uploadReq = new HttpRequest('POST', url, formData, {
        //     reportProgress: true,
        // });

        // this.http.request(uploadReq).subscribe(event => {
        //     if (event.type === HttpEventType.UploadProgress)
        //         this.progress = Math.round(100 * event.loaded / event.total);
        //     else if (event.type === HttpEventType.Response)
        //         this.message = event.body.toString();
        //     console.log('sucess');

        //     this.dialogRef.close();
        //     const msg = new Message();
        //     msg.msg = 'Your Note has been successfully created';
        //     msg.msgType = MessageTypes.Information;
        //     msg.autoCloseAfter = 4000;
        //     this._uiService.showToast(msg, 'info');
        // });

        this._noteService.createNotes(this.Note).subscribe((res) => {
            console.log('response----', res);
            this.dialogRef.close({data : this.Note});
            const msg = new Message();
            msg.msg = 'Your Note has been successfully created';
            msg.msgType = MessageTypes.Information;
            msg.autoCloseAfter = 4000;
            this._uiService.showToast(msg, 'info');
        }, (err) => { 
            
        });






    }


    protected getFullUrl(url: string): string {
        return environment.apiBaseUrl + url;
    }


}