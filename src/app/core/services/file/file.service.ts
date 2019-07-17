import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpService } from '../base/http.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Token } from "../../models/token";
import { environment } from '../../../../environments/environment';
import { Injectable, Inject } from '@angular/core';

import { IAuthService } from '../auth/iauth.service';

@Injectable()
export class FileService {

    constructor(
        @Inject('IAuthService')
        private _authService: IAuthService,
        private _http: HttpService
    ) {
    }

    public getJsonFile(file): Observable<any> {

        // let token: Token;
        // token = this._authService.getTokenData();
        // const options = new RequestOptions();
        // options.headers = new Headers();
        // options.headers.append('Authorization', token.tokenType + ' ' + token.tokenId);

        const getUrl = 'assets/dummy_data/'+file;
        return this._http.getJson(getUrl)
            // .map(res => res.json())
            .map((res: Response) => res)
            .catch((error: any) =>
            // Observable.throw(error.json() || 'Server error')
            {
                return Observable.throw(error);
            }
            );
    }
}