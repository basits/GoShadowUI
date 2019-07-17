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


@Component({
  selector: 'app-searchdetails',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  time: Date;
  SegmentName: string;
  Note = new Notes();
  NoteSegment = new Array<Notes>();
  search: string;
  interval;
  timeleft;

  constructor(public dialog: MatDialog,
    private _noteService: NotesService,
    private _router: Router, private route: ActivatedRoute,
    private _dataService: DataService
  ) {

    this.route.params.subscribe(val => {
      console.log('tst');
      this.onSearch();
    });


    this._router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };

  }

  ngOnInit() {

    // put the code from `ngOnInit` here
    if (this.route.snapshot.queryParams["keyword"]) {
      this.search = this.route.snapshot.queryParams["keyword"];
      this.onSearch();
    };


    this.route.params.subscribe(params => {
      if (params) {
        this.Note.segmentId = params.id
      }
    });

    // this.getAllNotesBySegment();
    // this._dataService.currentMessage.subscribe(message => this.SegmentName = message)
  }

  createRefrence() {
    const dialogRef = this.dialog.open(RefrenceInfoComponent, {
      width: '650px',
      data: { noteId: this.Note }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllNotesBySegment();
    });


  }

  navigate(n) {
    this._router.navigateByUrl('/segment/notes/' + n.notesId);
  }

  getAllNotesBySegment() {

    this._noteService.getAllNotesBySegmentId(this.Note.segmentId).subscribe((res) => {
      console.log('all notes----', res);
      this.NoteSegment = res;
      this.NoteSegment.forEach(element => {
        element.check = false;
        element.timeleft = "";
      });


    }, (err) => { });
  }


  createNote() {
    const dialogRef = this.dialog.open(CreateNote, {
      width: '450px',
      data: { segmentId: this.Note.segmentId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllNotesBySegment();
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
    n.starttime = new Date().toLocaleTimeString();
    console.log(n.starttime);
    n.check = true;
    this.interval = setInterval(() => {
      n.display = new Date().toLocaleTimeString();
      this.timeleft = new Date().toLocaleTimeString()
    }, 1000)
  }


  // pause(n: Notes) {
  //   let endTime = new Date().toLocaleTimeString();
  //   n.endtime = endTime;
  // }

  pauseTimer(n: Notes) {

    console.log(this.timeleft);
    clearInterval(this.interval);
    let endTime = new Date().toLocaleTimeString();
    n.endtime = endTime;

    n.check = false;
    this.updateTimer(n);


  }


  updateTimer(n: Notes) {

    this._noteService.notesUpdateTimer(n.timerId, "", n.starttime, n.endtime).subscribe((res) => {
      console.log('all notes----', res);

    }, (err) => { });

  }

  deleteNote(ns) {
    console.log('sss', ns)
    this._noteService.deleteNote(ns.notesId).subscribe((res) => {
      console.log("ns-----", res);
    })

  }

  searchkeyword() {

    this._noteService.searchNotes(this.search).subscribe((res) => {
      console.log('all notes----', res);
      this.NoteSegment = res;
    }, (err) => { });

  }



}



