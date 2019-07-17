import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateExperience } from '../../shared/create-experience/create.experience';
import { DataService } from '../../core/services/data.services';
import { Segment } from '../../core/models/segment';
import { RefrenceInfoComponent } from '../refrence/refrence.info';
import { Router, ActivatedRoute } from '@angular/router';
import { Notes } from '../../core/models/notes';
import { NotesService } from '../../core/services/notes/notes.service';
import { CreateNote } from '../../shared/create-note/create.note';
import { CountdownComponent } from 'ngx-countdown';
import { ConfirmDialog } from '../../shared/confirmation-dialog/confirmation.dialog';


@Component({
  selector: 'app-segmentdetails',
  templateUrl: './segment.details.component.html',
  styleUrls: ['./segment.details.component.css']
})

export class SegmentDetailsComponent implements OnInit {

  time: Date;
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  SegmentName: string;
  Note = new Notes();
  NoteSegment = new Array<Notes>();
  search: string;
  interval;
  timeleft;
  breadCrums: any;
  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  t;

  constructor(public dialog: MatDialog,
    private _noteService: NotesService,
    private _router: Router, private route: ActivatedRoute,
    private _dataService: DataService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params) {
        this.Note.segmentId = params.id
      }
    });

    this.getAllNotesBySegment();
    this._dataService.currentMessage.subscribe(message => this.SegmentName = message)
  }

  createRefrence() {
    const dialogRef = this.dialog.open(RefrenceInfoComponent, {
      width: '650px',
      data: { noteId: this.Note }
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.getAllNotesBySegment();
      var abc = result;
      var d: any = [];
      
      if(result) {
        
        d = result.data.json();
        d.check= false
        d.duration ="00:00:00"
        d.endtime= null
        d.files =null
        d.h1 = "00:00:00"
        d.hours= 0
        d.isDisLike= null
        d.isFavourite= null
        d.isLike= null
        d.isShow= false
        d.minutes= 0
        d.notes= 0
        d.notesId =d.id
        d.seconds = 0
        d.starttime = null
        d.tags = null
        
        d.timeleft = ""
        
        d.type = result.data.type == "0" ? "Person" : result.data.type == "1" ? "Location" : "Task"
      }
      this.NoteSegment.push(d);
    
    });
  }

  

  navigate(notes) {
    
    if(notes.length == 1)
      this._router.navigateByUrl('/segment/notes/' + notes[0].notesId);
    else 
      notes.isShow = !notes.isShow;  
    }

    navigateTimer(notes) {
      this._router.navigateByUrl('/segment/notes/' + notes.notesId);
    }

  getAllNotesBySegment() {

    this._noteService.getAllNotesBySegmentId(this.Note.segmentId).subscribe((res) => {
      console.log('all notes----', res);
      this.NoteSegment = res;
      var taskNoteslist = [];
      var notes = [];
      for(var i=0;i<this.NoteSegment.length;i++)
      {
        if(!this.NoteSegment[i].type){
          notes.push(this.NoteSegment[i]);
          if(i<this.NoteSegment.length-1){
            if(this.NoteSegment[i].type != this.NoteSegment[i+1].type){
              taskNoteslist.push(notes);
              
            }
          }else {
            taskNoteslist.push(notes);
          }
        } else {
          notes=[];
          taskNoteslist.push(this.NoteSegment[i]);
        }
      }
      this.NoteSegment = taskNoteslist;
      this.NoteSegment.forEach(element => {
        element.isShow = false;
		    element.check = false;
        element.seconds = 0;
        element.hours = 0;
        element.minutes = 0;
        element.h1 = element.duration;
        element.t;
        element.timeleft = "";
      });

      var abc = "as";

    }, (err) => { });

    this._noteService.breadCrums(this.Note.segmentId, false).subscribe((res) => {
      this.breadCrums = res;
    }, (err) => {

    });
  }

  breadCrumslink(id, type){
    if(type == 'home')
      this._router.navigate(['home']);
    else if(type == 'group')
      this._router.navigate(['group/experience'], { queryParams: { type: 'groupexperience', id: id } });
    else  
      this._router.navigate(['experience'], { queryParams: { type: 'individualexperience', id: id } });
  }


  createNote() {
    const dialogRef = this.dialog.open(CreateNote, {
      width: '450px',
      data: { segmentId: this.Note.segmentId }
    });
    dialogRef.afterClosed().subscribe(result => {
      //this.getAllNotesBySegment();
      var data: any = [];
      
      if(result) {
        result.data = {
          duration: null,
          endtime: null,
          files: null,
          isDisLike: null,
          isFavourite: null,
          isLike: null,
          notes: 0,
          notesId: null,
          starttime: null,
          tags: null,
          text: result.data.text,
          timerId: result.data.timerId,
          type: result.data.type,
        }
        data.push(result.data);
        
      }
        this.NoteSegment.push(data);
        this.NoteSegment[this.NoteSegment.length-1].check = false
        this.NoteSegment[this.NoteSegment.length-1].h1= undefined
        this.NoteSegment[this.NoteSegment.length-1].hours= 0
        this.NoteSegment[this.NoteSegment.length-1].isShow= false
        this.NoteSegment[this.NoteSegment.length-1].minutes= 0
        this.NoteSegment[this.NoteSegment.length-1].seconds= 0
        this.NoteSegment[this.NoteSegment.length-1].timeleft= ""
      console.log('The dialog was closed');
    });
    console.log('e');

  }

  onSearch() {

    this._noteService.searchNotes(this.search).subscribe((res) => {
      console.log('all notes----', res);
      this.NoteSegment = res;
    }, (err) => { });

  }

  startTimer(n: Notes) {
    n.starttime = new Date().toLocaleString();
    console.log(n.starttime);
    n.check = true;
    this.timer(n);
  }



  pauseTimer(n: Notes) {
    n.check = false;
    let endTime = new Date().toLocaleString();
    n.endtime = endTime;
    clearTimeout(n.t);
    this.updateTimer(n);

  }



  updateTimer(n: Notes) {

    this._noteService.notesUpdateTimer(n.timerId, n.h1, n.starttime, n.endtime).subscribe((res) => {
      console.log('all notes----', res);

    }, (err) => { });

  }

  deleteNote(ns) {
    console.log('sss', ns)
    if(!ns.notesId)
      ns.notesId = ns[0].notesId;

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      data: { type: 'note', noteId: ns.notesId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllNotesBySegment();
      console.log('The dialog was closed');
    });

    // this._noteService.deleteNote(ns.notesId).subscribe((res) => {
    //   console.log("ns-----", res);
    //   this.getAllNotesBySegment();
    // })

  }


  public timer(n: Notes) {
    var taskTimer;
    if (n.h1 != null) {
      taskTimer = n.h1.split(':');
      n.seconds = parseInt(taskTimer[2]);
      n.minutes = parseInt(taskTimer[1]);
      n.hours = parseInt(taskTimer[0]);
    }
    n.t = setTimeout(() => {
      n.seconds++;
      if (n.seconds >= 60) {
        n.seconds = 0;
        n.minutes++;
        if (n.minutes >= 60) {
          n.minutes = 0;
          n.hours++;
        }
      }

      n.h1 = (n.hours ? (n.hours > 9 ? n.hours : "0" + n.hours) : "00") + ":" + (n.minutes ? (n.minutes > 9 ? n.minutes : "0" + n.minutes) : "00") + ":" + (n.seconds > 9 ? n.seconds : "0" + n.seconds);

      this.timer(n)
    }, 1000);
  }


}



