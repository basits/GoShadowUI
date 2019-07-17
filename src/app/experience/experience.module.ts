import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceInfoComponent } from './info/experience.info.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SegmentDetailsComponent } from './segments/segment.details.component';
import { NotesInfoComponent } from './notes/notes.info';
import { AuthModule } from '../auth/auth.module';
import { ExperienceDetailComponent } from './detail/experience.detail.component';
import { RefrenceInfoComponent } from './refrence/refrence.info';
import { PicUpload } from './image-upload/pic.upload';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreview } from './image-upload/image-preview.directive';
import { CountdownModule } from 'ngx-countdown';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    FileUploadModule,
    CountdownModule,
    AuthModule
  ],
  declarations: [ExperienceInfoComponent, SegmentDetailsComponent, NotesInfoComponent, ExperienceDetailComponent, RefrenceInfoComponent, SearchComponent, PicUpload, ImagePreview],
  entryComponents: []
})
export class ExperienceModule { }
