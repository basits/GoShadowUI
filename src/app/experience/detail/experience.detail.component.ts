import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Subject } from 'rxjs/Subject';
import { UIService } from '../../core/services/ui/ui.service';
import { CreateExperience } from '../../shared/create-experience/create.experience';
import { CreateSegment } from '../../shared/create-segment/create.segment';

@Component({
  selector: 'app-experiencedetail',
  templateUrl: './experience.detail.component.html',
  styleUrls: ['./experience.detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {

  experienceId: string;
  Segments: Array<any>;
  Experiences: Array<any>;
  isSpinner: boolean = false;
  type: string;

  constructor(public dialog: MatDialog,
    private _router: Router, private route: ActivatedRoute,
    private _experienceService: ExperienceService,
    private _uiService: UIService,

  ) { }

  ngOnInit() {
    this.getExperience();
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
      this.getExperience();
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


  editExperience(e) {

    const dialogRef = this.dialog.open(CreateExperience, {
      width: '450px',
      data: { type: 'edit', experience: e }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getExperience();
      console.log('The dialog was closed');
    });
    console.log('e');

  }

  deleteExperience(e) {

    this.isSpinner = true;
    this._experienceService.deleteExperience(e.id).subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.isSpinner = false;
        this.getExperience()
        console.log("response from user experience and groups--- ", res);
      },
      (err) => {
      }
    );


  }


}



