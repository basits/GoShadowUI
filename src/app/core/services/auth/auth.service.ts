
import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { IAuthService } from "./iauth.service";
import { UIService } from '../ui/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from "../../models/user";
import { Token } from "../../models/token";
import { environment } from "../../../../environments/environment";

import { Message, MessageTypes } from "../../models/message";


@Injectable()
export class AuthService implements IAuthService, OnDestroy {



    private messageSource = new BehaviorSubject<boolean>(false);
    currentMessage = this.messageSource.asObservable();

    loginStatusChanged = new Subject<User>();

    private _clientId: string = '';
    private _clientSecret: string = '';
    private token_expires: number;
    constructor(private _http: Http, private _router: Router,
        private _uiService: UIService,
    ) {
    }

    ngOnDestroy(): void {
        console.log("destorying auth service");
    }

    /**
    * Build API url.
    * @param url
    * @returns {string}
    */
    signinstatus(message: boolean) {
        this.messageSource.next(message)
    }

    protected getAuthFullUrl(url: string): string {
        return environment.apiBaseUrl + url;
        // return environment.apiBaseUrl + url;
    }

    protected getFullUrl(url: string): string {
        // return environment.authBaseUrl + url;
        return environment.apiBaseUrl + url;
    }

    protected mapUser(res: any): User {

        const data = res.json();
        console.log('data-----', data);
        const isUser = new User();
        let finalUser = data.user;
        isUser.email = finalUser.email;
        isUser.firstName = finalUser.firstName;
        isUser.lastName = finalUser.lastName;
        isUser.id = finalUser.id;

        // isUser.isActive = userData.isActive;
        // isUser.isBlocked = userData.isBlocked;
        // isUser.lastLogin = userData.lastLogin;
        // isUser.createdOn = userData.createdOn;
        // isUser.createdBy = userData.createdBy;
        // isUser.updatedOn = userData.updatedOn;
        // isUser.updatedBy = userData.updatedBy;


        return isUser;
    }

    /**
     * Build API url 
     * @param res 
     */
    protected getAPIFullUrl(url: String): string {
        return environment.apiBaseUrl + url
    }

    private SaveToken(response: Response) {
        let data = response.json();
        sessionStorage.setItem('token', data.token);
        localStorage.setItem('token', data.token);
        return data;
    }
    checkToken(): boolean {
        if (sessionStorage.getItem('token')) {
            return true;

        } else {
            return false;
        }
    }

    isLoggedIn(): boolean {
        // console.log('authInfo1');
        // const user = this.getUser();
        // console.log('authInfo2',user);

        // if (user && user.isLoggedIn) {
        //     return true;
        // }

        const token = this.getTokenData();
        if (token && token.tokenExpiry) {
            if (token.tokenExpiry > Date.now().toString()) {
                return true;
            }
        }
        return false;
    }


    checkLogin(user: User): Observable<any> {

        let url = this.getAuthFullUrl('token');
        let data = { UserName: user.email, Password: user.encryptedPassword };

        const options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        return this._http.get(url, { params: data }).catch((err, caught) => {
            return Observable.throw(err.json());
        }).do((res) => {
            console.log('respons from api ');
            const isUser = this.mapUser(res);
            this.storeUser(isUser);
            // this.loginStatusChanged.next(isUser);
            this.SaveToken(res);
        });



    }


    forgotPassword(user: User): Observable<any> {
        let url = this.getFullUrl('forgetpassword');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let data = { email: user.email };

        return this._http.get(url, { params: data })
            .catch((err, caught) => {
                //console.log(err);
                return Observable.throw(err);
            });
    }



    resetPassword(user: User): Observable<any> {

        let url = this.getFullUrl('updatepassword');

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let data = { Id: user.userId, Password: user.password };

        return this._http.put(url, {}, { params: data })
            .catch((err, caught) => {
                return Observable.throw(err)
            })
    }




    checkEmailAvailability(emailAddress, entityType): Observable<any> {

        // let url = this.getFullUrl('email/available');

        // let options = new RequestOptions();
        // options.headers = new Headers();
        // options.headers.append('Content-Type', 'application/json');

        // let body = {
        //     email: emailAddress,
        //     entityType: entityType
        // }

        // return this._http.post(url, body, options)
        //     .catch((err, caught) => {
        //         return Observable.throw(err);
        //     });

        let url = this.getAPIFullUrl("/user/email/available/" + emailAddress);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    update(user): Observable<any> {
        let url = this.getAPIFullUrl("user/registration/complete")
        let body = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            title: user.title,
            credentials: user.credentials,
            employer: user.employer,
            address: user.address,
            cityId: user.city.id,
            countryId: user.country.id,
            zipCode: user.zipCode,
            stateId: user.state.id,
            secretQuestion1: user.secretQuestion1,
            secretQuestion2: user.secretQuestion2,
            secretAnswer1: user.secretAnswer1,
            secretAnswer2: user.secretAnswer2
        }
        if (user.specialist.speciality) {
            body['specialist'] = {
                specialityId: user.specialist.speciality ? user.specialist.speciality.id : null,
                deaNumber: user.specialist.deaNumber,
                npiNumber: user.specialist.npiNumber,
                physicianLicenseNumber: user.specialist.physicianLicenseNumber,
                licensedStates: user.specialist.licensedStates ? user.specialist.licensedStates.id : null,
                practiceGroup: user.specialist.practiceGroup
            }
        }
        return this._http.put(url, body)
            .catch((err, caught) => {
                return Observable.throw(err)
            })
    }

    register(user: User): Observable<any> {

        console.log('register')
        let url = this.getAPIFullUrl('user');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body =
        {
            email: user.email,
            password: user.password,
            firstname: user.firstName,
            lastname: user.lastName
        }
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Signup request has been completed."))
    }

    verifyKey(key: string): Observable<any> {
        // let url = this.getAPIFullUrl('user/registration/verify');
        // let url = this.getAPIFullUrl('verify/account');
        let url = this.getAPIFullUrl('user/verify/account');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = { VerificationKey: key }

        return this._http.put(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Email verification has been completed."));
    }

    resendEmail(user: User): Observable<any> {
        let url = this.getFullUrl('accountverification/resend');
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            email: user.email,
            // entityType: user.entityType
        }
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // .finally(() => console.log("Email verification has been completed."));
    }

    resendVerificationEmail(user: User): Observable<any> {
        // let url = this.getFullUrl('user/resend/verification/' + user.email);
        let url = this.getFullUrl('user/resend/verification/email/' + user.email);

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let body = {
            //     email: user.email,
            //     entityType: user.entityType
        }
        return this._http.post(url, body, options)
            .catch((err, caught) => {
                return Observable.throw(err);
            });
        // // .finally(() => console.log("Email verification has been completed."));

        // return this._http.get(url).catch((err, caught) => {
        //     return Observable.throw(err);
        // });
    }

    getToken(): string {
        var token = sessionStorage.getItem('token');
        if(!token)
            token = localStorage.getItem('token');
        return token;
    }

    getTokenData(): Token {

        const token = new Token();

        token.tokenId = localStorage.getItem('token_id');
        token.tokenExpiry = localStorage.getItem('token_expiry');
        token.refreshToken = localStorage.getItem('refresh_token');
        token.tokenType = localStorage.getItem('token_type');

        return token;

    }

    getLoggedinUser(): User {
        return this.getUser();
    }

    public storeUser(user: User) {
        if (!user) return;
        sessionStorage.setItem('user', JSON.stringify(user));
        // if (this.checkToken()) {
        // this.loginStatusChanged.next(true);
        // }
        //  console.log("user stored in local storage");
    }

    public storeUrlPath(urlPath: string) {
        localStorage.setItem('urlPath', JSON.stringify(urlPath));
    }

    getUrlPath(): string {
        return JSON.parse(localStorage.getItem('urlPath'));
    }

    getUser(): User {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'));
        }
        return;
    }

    verifyEmail(email: String) {
        let url = this.getAPIFullUrl("/user/email/available/" + email);
        return this._http.get(url).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    logoutUser() {

        console.log('test');
        sessionStorage.clear();
        localStorage.clear();
        this._router.navigate(['login']);

        //this.loginStatusChanged.next(null);
        // console.log("Token Expired");

    }


    activateUser(userId: string): Observable<any> {

        let url = this.getFullUrl('activateuser');

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');

        let data = { userId:  userId};

        return this._http.put(url, {}, { params: data })
            .catch((err, caught) => {
                return Observable.throw(err)
            })
    }

    errStatusCheck(err: any): any {
        let errMsg: string;
        console.log('err', err);

        // this.isError = true;
        // this.isSubmitStarted = false;
        // this.onSubmitFinished.emit(err);
        const msg = new Message();
        msg.title = "";
        msg.iconType = "";
        if (err.status == 400) {
            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else if (err.status == 401) {
            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else if (err.status == 404 && err.statusText == "Not Found") {

            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else if (err.status == 404 && err.statusText !== "Not Found") {

            msg.msg = err.json() ? err.json() : 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg

        }
        else {
            msg.msg = 'Sorry, an error has occured';
            msg.msgType = MessageTypes.Error;
            msg.autoCloseAfter = 400;
            this._uiService.showToast(msg, '');
            return msg
        }
    }
}