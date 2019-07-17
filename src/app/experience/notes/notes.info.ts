import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Notes, NoteImagesFiles } from '../../core/models/notes';
import { MessageTypes, Message } from '../../core/models/message';
import { UIService } from '../../core/services/ui/ui.service';
import { NotesService } from '../../core/services/notes/notes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../core/models/user';
import { HttpRequest, HttpEventType, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

export interface Fruit {
  name: string;
}

export interface Tags {
  name: string;
}

@Component({
  selector: 'app-notes',
  templateUrl: './notes.info.html',
  styleUrls: ['./notes.info.css'],
  providers: [DatePipe]
})

export class NotesInfoComponent implements OnInit {


  imgArray:NoteImagesFiles[] = [];
  Note = new Notes();
  visible = true;
  NoteTag = Array<string>();
  selectable = true;
  removable = true;
  addOnBlur = true;
  User: any;
  name: string;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  startTime: string;
  endTime: string;
  tags = [];
  progress: number;
  message: any;
  breadCrums: any;

  constructor(public dialog: MatDialog,
    private _uiService: UIService,
    public http: HttpClient,
    private _router: Router, private route: ActivatedRoute,
    private _noteService: NotesService,
    private _authService: AuthService,
    private datePipe: DatePipe
  ) {


  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      if (params) {
        this.Note.notesId = params.id
      }
    });

    this.User = this._authService.getUser();
    this.name = this.User.firstName;
    console.log('sssssss', this.User)

    this.getNote();
  }



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  remove(tag: Tags): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  createNotes() {
    this.updateNotes();
    //this.addTags();
  }

  breadCrumslink(id, type){
    if(type == 'home')
      this._router.navigate(['home']);
    else if(type == 'group')
      this._router.navigate(['group/experience'], { queryParams: { type: 'groupexperience', id: id } });
    else if(type == 'experince')
      this._router.navigate(['experience'], { queryParams: { type: 'individualexperience', id: id } });
    else
      this._router.navigate(['segments/'+id]);
  }

  getNote() {

    this._noteService.getNotes(this.Note.notesId).subscribe((res) => {
      console.log('response----', res);

      this.Note = res;
      this.startTime = this.Note.starttime;
      this.endTime = this.Note.endtime;
  
      // // var durationtime = this.Note.duration.split(':')[0] + ':' + this.Note.duration.split(':')[1];
      // // var starttimedate = this.Note.starttime.split('T');
      // // var starttime = starttimedate[1].split(':')[0] + ':' + starttimedate[1].split(':')[1];

      // // var twotime = this.addTimes(durationtime, starttime);
      // // this.Note.starttime = starttimedate[0] + 'T'+twotime+':'+starttimedate[1].split(':')[2];
      

      this.Note.files.forEach(element => {
        if(element.mimeType)
          this.imgArray.push({
            id : element.id,
            file: element.file,
            mimeType: element.mimeType,
            isShow: true
          });
      });;
      //this.Note.starttime = this.datePipe.transform(this.Note.starttime, 'M-d-yy h:mm a');
       this.Note.tags.forEach(e=>{
         if(e != "")
         this.tags.push(e);
      });
    }, (err) => { });

    this._noteService.breadCrums(this.Note.notesId, true).subscribe((res) => {
      this.breadCrums = res;
    }, (err) => { });
  }

  deletePhoto(img: NoteImagesFiles) {
    this._noteService.deletePhoto(img.id).subscribe((res) => {
      img.isShow = false;
    }, (err) => { });


  }

  isFavourite() {
    let isfavourite = true;
    this._noteService.noteIsFavourite(this.Note.notesId, isfavourite).subscribe((res) => {
      console.log('response----', res);
      this.Note.isFavourite = true;
    }, (err) => { });


  }

  isUnFavourite() {
    let isfavourite = false;
    this._noteService.noteIsFavourite(this.Note.notesId, isfavourite).subscribe((res) => {
      console.log('response----', res);
      this.Note.isFavourite = false;
    }, (err) => { });

  }


  isLike(check) {

    let islike = "true";
    if (check == true) {
      islike = "true";
    } else if (check == false) {
      islike = "false";
    }

    this._noteService.noteIsLike(this.Note.notesId, islike).subscribe((res) => {
      console.log('response----', res);

      if (check == false) {
        this.Note.isLike = false;
      } else if (check == true) {
        this.Note.isLike = true;
      }

    }, (err) => { });

  }

  isDisLike(check) {

    let isdislike = "false";

    if (check == true) {
      isdislike = "true";
    } else if (check == false) {
      isdislike = "false";
    }

    this._noteService.noteIsDislike(this.Note.notesId, isdislike).subscribe((res) => {
      console.log('response----', res);

      if (check == false) {
        this.Note.isDisLike = false;
      } else if (check == true) {
        this.Note.isDisLike = true;
      }

    }, (err) => { });

  }


  addTags() {
    this._noteService.addTags(this.Note.notesId, this.tags).subscribe((res) => {
      console.log('response----', res);
    }, (err) => { });

  }


  updateNotes() {
    console.log('notes update', this.Note)
    this.Note.tags = this.tags;
    
    // if starttime is change to backward
    if(this.startTime != this.Note.starttime) {
        var duration = this.Note.duration.split(':');
        var endtime = moment(this.Note.starttime).add({hours: parseInt(duration[0]), minutes: parseInt(duration[1]), seconds: parseInt(duration[2])});
        this.Note.endtime = endtime.format('YYYY-MM-DDTHH:mm:ss');
    } else {
      
        var duration = this.Note.duration.split(':');
        var starttime = moment(this.Note.endtime).subtract({hours: parseInt(duration[0]), minutes: parseInt(duration[1]), seconds: parseInt(duration[2])});
        this.Note.starttime = starttime.format('YYYY-MM-DDTHH:mm:ss');
    }
    
    this._noteService.notesUpdate(this.Note.notesId, this.Note).subscribe((res) => {
      const msg = new Message();
            msg.msg = 'Your Note has been successfully Updated';
            msg.msgType = MessageTypes.Information;
            msg.autoCloseAfter = 4000;
            this._uiService.showToast(msg, 'info');
    }, (err) => { });

  }


  upload(files?: any) {

    let url = this.getFullUrl('notes/uploadphoto');
    const formData = new FormData();
    if (files) {
      for (let file of files)
        formData.append("photoUrl", file);
    }
    formData.append("notesId",this.Note.notesId)
    formData.append("text", this.Note.text);
    



    let headers: HttpHeaders = new HttpHeaders();
          headers = headers.append('Content-Type', 'application/json');

          let token = this._authService.getToken();
  
          if (token) {
            headers = headers.append('Authorization', "bearer " + token);
          }
          //headers = headers.append('reportProgress', 'true')
    const uploadReq = new HttpRequest('PUT', url, formData,{
      reportProgress: true
    });

    // this._noteService.uploadPhoto(this.Note.notesId, formData).subscribe((res) => {
    //   const msg = new Message();
    //         msg.msg = 'Your Note has been successfully Updated';
    //         msg.msgType = MessageTypes.Information;
    //         msg.autoCloseAfter = 4000;
    //         this._uiService.showToast(msg, 'info');
    // }, (err) => { });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body;
        if(this.message)
          window.location.reload();
    });
  }


  private timeToMins(time) {
    var b = time.split(':');
    return b[0]*60 + +b[1];
  }
  
  // Convert minutes to a time in format hh:mm
  // Returned value is in range 00  to 24 hrs
  private timeFromMins(mins) {
    function z(n){return (n<10? '0':'') + n;}
    var h = (mins/60 |0) % 24;
    var m = mins % 60;
    return z(h) + ':' + z(m);
  }
  
  // Add two times in hh:mm format
  private addTimes(t0, t1) {
    return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
  }

  protected getFullUrl(url: string): string {
    return environment.apiBaseUrl + url;
  }

}




