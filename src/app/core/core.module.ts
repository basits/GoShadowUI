import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { LogService } from "./services/log/log.service";
import { AuthService } from "./services/auth/auth.service";
import { HttpService } from "./services/base/http.service";
import { RoutingInfoService } from "./services/routInfo/route.info.service";
import { UIService } from "./services/ui/ui.service";




import { OrganizationService } from "./services/organization/organization.service";


import { UserService } from '../core/services/user/user.service'
import { LoginGuard } from '../core/services/guard/login.guard';
import { ExperienceService } from './services/experience/experience.service';
import { NotesService } from './services/notes/notes.service';
import { DataService } from './services/data.services';

@NgModule({
    imports: [HttpModule],
    providers: [{ provide: 'ILogService', useClass: LogService },
    { provide: 'IAuthService', useClass: AuthService },
        UIService, HttpService,
        RoutingInfoService,
        OrganizationService,
        ExperienceService,
        DataService,
        NotesService,
        UserService,
        LoginGuard],
    declarations: [],
    exports: []
})
export class CoreModule { }