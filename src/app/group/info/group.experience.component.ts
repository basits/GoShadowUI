import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ExperienceService } from '../../core/services/experience/experience.service';
import { Subject } from 'rxjs/Subject';
import { UIService } from '../../core/services/ui/ui.service';
import { CreateExperience } from '../../shared/create-experience/create.experience';
import { CreateSegment } from '../../shared/create-segment/create.segment';

@Component({
  selector: 'app-experienceinfo',
  templateUrl: './group.experience.component.html',
  styleUrls: ['./group.experience.component.css']
})
export class GroupExperienceInfoComponent implements OnInit {

  experienceId: string;
  Segments: Array<any>;
  Experience: Array<any>;
  groupId: string;
  type: string;
  groupDetail: any;
  constructor(public dialog: MatDialog,
    private _router: Router, private route: ActivatedRoute,
    private _experienceService: ExperienceService,
    private _uiService: UIService,

  ) { }

  ngOnInit() {

    console.log('url-------', this._router.url);
    this.type = this.route.snapshot.queryParams["type"];
    let id = this.route.snapshot.queryParams['id']
    console.log("type======", id);

    if (this.type == 'groupexperience') {
      const id = this.route.snapshot.queryParams['id'];
      if (id) {
        this.groupId = id;
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
      console.log('The dialog was closed');
    });
    console.log('e');

  }

  createExperience() {
    const dialogRef = this.dialog.open(CreateExperience, {
      width: '450px',
      data: { groupId: this.groupId }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllExperienceByGroup(this.groupId);
    });

  }

  getAllExperienceByGroup(gid) {
    this._uiService.showSpinner();

    this._experienceService.getAllExperienceByGroup(gid).subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.Experience = res;
        console.log('results ', res);
      });

      this._experienceService.getGroupDetail(gid).subscribe(
        (res) => {
          this._uiService.hideSpinner();
          this.groupDetail = res;
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

  }

  navigate(e) {
    this._router.navigate(['/experience'], { queryParams: { type: 'individualexperience', id: e.id } });
  }


  editExperience(e) {

    const dialogRef = this.dialog.open(CreateExperience, {
      width: '450px',
      data: { type: 'edit', experience: e }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllExperienceByGroup(this.groupId);
      console.log('The dialog was closed');
    });
    console.log('e');

  }

  deleteExperience(e) {


    this._experienceService.deleteExperience(e.id).subscribe(
      (res) => {
        this._uiService.hideSpinner();
        this.getAllExperienceByGroup(this.groupId);
        console.log("response from user experience and groups--- ", res);
      },
      (err) => {
      }
    );


  }


  InviteMembers() {
    //this._router.navigate(['/group/invite/user'];
    this._router.navigateByUrl('/group/invite/' + this.groupId);
  }
}



