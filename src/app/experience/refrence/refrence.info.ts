import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { Notes } from '../../core/models/notes';
import { NotesService } from '../../core/services/notes/notes.service';
import { Message, MessageTypes } from '../../core/models/message';
import { HttpRequest, HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UIService } from '../../core/services/ui/ui.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-refrence',
  templateUrl: './refrence.info.html',
  styleUrls: ['./refrence.info.css']
})

export class RefrenceInfoComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  Notes = new Notes();
  Person: string;
  Location: string;
  Task: string;
  message: any;
  progress: number;

  myControl = new FormControl();
  options: Notes[];
  personOption: Notes[];
  placeOption: Notes[];
  taskOption: Notes[];

  filteredOptions: Notes[];

  constructor(public dialog: MatDialog,
    private _noteService: NotesService,
    private _uiService: UIService,
    private http : HttpClient,
    public dialogRef: MatDialogRef<RefrenceInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    let notes = data.noteId;
    console.log("notes----------", data.noteId);
    if (data) {
      this.Notes.segmentId = notes.segmentId || "";
    }
  }

  ngOnInit() {
    this._noteService.getNotyesList()
      .subscribe(data => {
        this.options = data.json();
        this.personOption = this.options.filter(o=>o.type == 'Person');
      });
  }

  filterTask() {
    this.personOption = this.options.filter(o=>o.type == 'Task');
    this.filteredOptions = this._filter(this.Task);
  }

  filterLocation() {
    this.personOption = this.options.filter(o=>o.type == 'Location');
    this.filteredOptions = this._filter(this.Location);
  }

  filterPerson() {
    this.personOption = this.options.filter(o=>o.type == 'Person');
    this.filteredOptions = this._filter(this.Person);
  }

  private _filter(value: any): Notes[] {
    if(typeof value === "string") {
      const filterValue = value.toLowerCase();

      return this.personOption.filter(option => option.text.toLowerCase().includes(filterValue));
    } else {
      if(value.type == "Person")
        this.Person = value.text;
      else if(value.type == "Task")
        this.Task = value.text;
      else if(value.type == "Location")
        this.Location = value.text;     
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
}
  createNotes(type) {
    if (type == 'Person') {
      this.Notes.type = "0"
      this.Notes.text = this.Person;

    } else if (type == 'Task') {
      this.Notes.type = "1"
      this.Notes.text = this.Task;

    } else if (type == 'Location') {
      this.Notes.type = "2"
      this.Notes.text = this.Location
    }

    
    console.log('create notes-------', this.Notes);
    let url = this.getFullUrl('notes');

    // const formData = new FormData();
    // formData.append("segmentId", this.Notes.segmentId);
    // formData.append("Text", this.Notes.text);
    // formData.append("Type", this.Notes.type);


    // const uploadReq = new HttpRequest('POST', url, formData, {
    //   reportProgress: true,
    // });

    // this.http.request(uploadReq).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress)
    //     this.progress = Math.round(100 * event.loaded / event.total);
    //   else if (event.type === HttpEventType.Response)
    //     // this.message = event.body.toString();
    //   console.log('sucess');

    //   this.dialogRef.close();
    //   const msg = new Message();
    //   msg.msg = 'Your Note has been successfully created';
    //   msg.msgType = MessageTypes.Information;
    //   msg.autoCloseAfter = 4000;
    //   this._uiService.showToast(msg, 'info');
    // });






    this._noteService.createNotes(this.Notes).subscribe((res) => {
      console.log('response----', res);
      this.dialogRef.close({data: res});
      const msg = new Message();
      msg.msg = 'Your Notes has been successfully created';
      msg.msgType = MessageTypes.Information;
      msg.autoCloseAfter = 4000;
      // this._uiService.showToast(msg, 'info');
    }, (err) => { });


  }

  protected getFullUrl(url: string): string {
    return environment.apiBaseUrl + url;
  }

  public newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
    }

}




