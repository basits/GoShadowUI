import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { GroupExperienceInfoComponent } from './info/group.experience.component';
import { SharedModule } from '../shared/shared.module';
import { GroupDetailComponent } from './detail/group.detail.component';
import { UserInviteComponent } from './invitation/user.invite.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    AuthModule
  ],
  declarations: [GroupExperienceInfoComponent, GroupDetailComponent, UserInviteComponent],
  entryComponents: []
})
export class GroupModule { }
