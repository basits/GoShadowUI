import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Subject } from 'rxjs/Subject';
import { UIService } from '../../core/services/ui/ui.service';
import { CreateExperience } from '../../shared/create-experience/create.experience';
import { CreateSegment } from '../../shared/create-segment/create.segment';
import { DataService } from '../../core/services/data.services';
import { ConfirmDialog } from '../../shared/confirmation-dialog/confirmation.dialog';

@Component({
  selector: 'app-experienceinfo',
  templateUrl: './experience.info.component.html',
  styleUrls: ['./experience.info.component.css']
})
export class ExperienceInfoComponent implements OnInit {

  experienceId: string;
  Segments: Array<any>;
  Experience: Array<any>;
  type: string;
  search: string;
  breadCrums: any;
  constructor(public dialog: MatDialog,
    private _router: Router, private route: ActivatedRoute,
    private _experienceService: ExperienceService,
    private _uiService: UIService,
    private _dataService: DataService

  ) { }

  ngOnInit() {

    console.log('url-------', this._router.url);
    this.type = this.route.snapshot.queryParams["type"];
    let id = this.route.snapshot.queryParams['id']
    console.log("type======", id);


    if (this.type == 'individualexperience') {
      const id = this.route.snapshot.queryParams['id'];
      if (id) {
        this.experienceId = id;
        this.getAllSegmentsByExperience(id);

      }
    } else if (this.type == 'groupexperience') {
      const id = this.route.snapshot.queryParams['id'];
      if (id) {
        this.experienceId = id;
        this.getAllExperienceByGroup(id);
      }
    }

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
      this.getAllSegmentsByExperience(this.experienceId);
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

  getAllExperienceByGroup(gid) {
    this._uiService.showSpinner();

    this._experienceService.getAllExperienceByGroup(gid).subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.Experience = res;
        console.log('results ', res);
      });


  }
  getAllSegmentsByExperience(eid) {
    this._uiService.showSpinner();

    this._experienceService.getAllSegmentsByExperience(eid).subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.Segments = res;
        console.log('results ', res);
      });

      this._experienceService.getSegmentBreadcrum(eid).subscribe(
        (res) => {
          this._uiService.hideSpinner();
          this.breadCrums = res;
          console.log('results ', res);
        });

  }

  breadCrumslink(id, type){
    if(type == 'home')
      this._router.navigate(['home']);
    else
      this._router.navigate(['group/experience'], { queryParams: { type: 'groupexperience', id: id } });
  }

  navigate(s) {
    this._dataService.changeMessage(s.name)
    this._router.navigateByUrl('/segments/' + s.id);
  }


  editSegment(s) {
    const dialogRef = this.dialog.open(CreateSegment, {
      width: '450px',
      data: { type: 'edit', segment: s }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllSegmentsByExperience(this.experienceId);
    });
    console.log('e');

  }

  deleteSegment(s) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      data: { type: 'segment', segment: s }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllSegmentsByExperience(this.experienceId);
    });

    // this._experienceService.deleteSegment(s.id).subscribe(
    //   (res) => {
    //     this.getAllSegmentsByExperience(this.experienceId);
    //     console.log("response from user experience and groups--- ", res);
    //   },
    //   (err) => {
    //   }
    // );

  }





}




