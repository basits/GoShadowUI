
import { HttpService } from '../base/http.service';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Notes } from '../../models/notes';
import { HttpRequest, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class NotesService {

    getUrl: string;
    constructor(private _http: HttpService, private http: Http, private _authService: AuthService) { }


    public getAllNotesBySegmentId(noteId: any): Observable<any> {
        this.getUrl = 'notes/allnotesbysegment';
        return this._http.get(`${this.getUrl}/${noteId}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public breadCrums(noteId: any, isNote: boolean): Observable<any> {
        this.getUrl = 'notes/breadcrumbs';
        return this._http.get(`${this.getUrl}?segmentid=${noteId}&isNotes=`+isNote)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }



    createNotes(Note: any): Observable<any> {

        let url = 'notes';
        var note = {
            segmentId: Note.segmentId,
            text: Note.text,
            type: Note.type,
        }

        return this._http.post(url, note)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    getNotyesList(): Observable<any> {

        let url = 'notes/getnotetypeslist';
        

        return this._http.get(url)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    // createNotes(notes: any): Observable<any> {
    //     let getUrl = 'notes';
    //     //let body = notes;
    //     console.log('datatata' , notes);
    //     return this._http.post(getUrl, notes)
    //         .map((res: Response) => res)
    //         .catch((err, caught) => {
    //             return Observable.throw(err);
    //         })
    // }

    getNotes(noteId) {
        this.getUrl = 'notes';
        return this._http.get(`${this.getUrl}/${noteId}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    

    noteIsLike(noteId, query): Observable<any> {

        this.getUrl = "notes";
        let body = {};
        let data = { islike: query };

        return this._http.patch(`${this.getUrl}/${noteId}/islike`, body, { params: data }).catch((err, caught) => {
            return Observable.throw(err);
        });
    }


    noteIsDislike(noteId, query): Observable<any> {

        this.getUrl = "notes";
        let body = {};
        let data = { isdislike: query };

        return this._http.patch(`${this.getUrl}/${noteId}/isdislike`, body, { params: data }).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    noteIsFavourite(noteId, query): Observable<any> {

        this.getUrl = "notes";
        let body = {};
        let data = { isfavourite: query };

        return this._http.patch(`${this.getUrl}/${noteId}/isfavourite`, body, { params: data }).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    deletePhoto(photoId: string): Observable<any> {

        this.getUrl = "notes/photo/delete";
        let body = {};
        let data = { id: photoId };

        return this._http.put(`${this.getUrl}/${photoId}`, body, { params: data }).catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    addTags(noteId, noteTags) {
        this.getUrl = "notes/addtags";
        let body = noteTags;
        return this._http.put(`${this.getUrl}/${noteId}`, body).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    notesUpdate(noteId, model) {

        this.getUrl = "notes";
        let body = model;
        return this._http.patch(`${this.getUrl}/${noteId}`, body).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    uploadPhoto(noteId: string, model): Observable<any> {

        let getUrl = 'notes/uploadphoto';
        let body = model

        return this._http.Uploadpost(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    searchNotes(search: string) {
        this.getUrl = 'notes/search';
        let data = { query: search };

        return this._http.get(`${this.getUrl}`, { params: data })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    notesUpdateTimer(timerId, duration, startTime, EndTime) {

        this.getUrl = "notes/updatetimer";
        let data = { Id: timerId, Duration: duration, StartTime: startTime, EndTime: EndTime };
        let body = {};
        return this._http.put(`${this.getUrl}`, data, { params: data }).catch((err, caught) => {
            return Observable.throw(err);
        });

    }

    public deleteNote(id): Observable<any> {
        this.getUrl = 'notes/deletenote'
        return this._http.put(`${this.getUrl}/${id}`,{}).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public setHeaders(headers: Headers): Headers {

        let h = headers ? headers : new Headers();
        if (h.keys.length == 0)
            //h.append('Content-Type', 'multipart/form-data');
            h.append('Content-Type', ' application/x-www-form-urlencoded')
        //h.append('Accept', 'application/json');


        let token = this._authService.getToken();

        if (token) {
            h.append('Authorization', "bearer " + token);
        }

        return h;
    }


    protected getFullUrl(url: string): string {
        return environment.apiBaseUrl + url;
    }

}

