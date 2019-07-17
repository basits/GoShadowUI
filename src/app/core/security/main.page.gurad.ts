import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class CanActivateViaMainGuard implements CanActivate {

    constructor(@Inject('IAuthService') private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const authInfo = this.authService.getToken();
        //if true then return else go to landing page
        if (authInfo) {
            this.router.navigate(['/home']);
            console.log('authInfo', authInfo);
        } else {
            return true;
        }

    }
}
