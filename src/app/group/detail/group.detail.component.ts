import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Subject } from 'rxjs/Subject';
import { UIService } from '../../core/services/ui/ui.service';
import { CreateExperience } from '../../shared/create-experience/create.experience';
import { CreateSegment } from '../../shared/create-segment/create.segment';
import { Groups } from '../../core/models/groups';
import { CreateGroup } from '../../shared/create-group/create.group';
import { ConfirmDialog } from '../../shared/confirmation-dialog/confirmation.dialog';

@Component({
  selector: 'app-groupdetail',
  templateUrl: './group.detail.component.html',
  styleUrls: ['./group.detail.component.css']
})
export class GroupDetailComponent implements OnInit {

  experienceId: string;
  Segments: Array<any>;
  Experiences: Array<any>;
  isSpinner: boolean = false;
  type: string;
  Groups: Array<Groups>;



  constructor(public dialog: MatDialog,
    private _router: Router, private route: ActivatedRoute,
    private _experienceService: ExperienceService,
    private _uiService: UIService,

  ) { }

  ngOnInit() {
    // this.getExperience();
    this.getGroups();
  }



  ngOnDestroy() {
    console.log('destroying..');

  }


  createSegment() {
    const dialogRef = this.dialog.open(CreateSegment, {
      width: '450px',
      data: { experienceId: this.experienceId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    console.log('e');

  }

  createExperience() {
    const dialogRef = this.dialog.open(CreateExperience, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    console.log('e');

  }


  getExperience() {
    this._uiService.showSpinner();
    this._experienceService.getAllExperienceByUser().subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.isSpinner = false;
        this.Experiences = res
      },
      (err) => {
        this._uiService.hideSpinner();
      }
    );
  }

  navigateToSegment(type, e) {
    console.log('navigation ID', e);
    if (type == 'groupexperience') {
      this._router.navigate(['/group/experience'], { queryParams: { type: 'groupexperience', id: e.id } });
    } else if (type == 'individualexperience') {
      this._router.navigate(['/experience'], { queryParams: { type: 'individualexperience', id: e.id } });
    }


  }


  getGroups() {

    this._uiService.showSpinner();
    this._experienceService.getAllGroupByUser().subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.Groups = res
        console.log("response from user experience and groups--- ", res);
      },
      (err) => {
        this._uiService.hideSpinner();
      }
    );


  }


  editGroup(g: Groups) {
    const dialogRef = this.dialog.open(CreateGroup, {
      width: '450px',
      data: { type: 'edit', group: g }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getGroups();
    });
    console.log('c');
  }

  deleteGroup(g: Groups) {


    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      data: { type: 'group', group: g }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getGroups();
    });
    console.log('c');

    // this.isSpinner = true;
    // this._experienceService.deleteGroups(g.id).subscribe(
    //     (res) => {
    //         this._uiService.hideSpinner();
    //         this.isSpinner = false;
    //         this.getGroups()
    //         console.log("response from user experience and groups--- ", res);
    //     },
    //     (err) => {
    //     }
    // );

  }

}



