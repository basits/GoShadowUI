
import { HttpService } from '../base/http.service';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Experience } from '../../models/experience';
import { Groups } from '../../models/groups';
import { Segment } from '../../models/segment';

@Injectable()
export class ExperienceService {

    getUrl: string;
    
    constructor(private _http: HttpService) { }

    public getAllExperienceByUser(): Observable<any> {
        return this._http.get('experiences/getallexperincesbyuser').map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getAllGroupByUser(): Observable<any> {
        return this._http.get('groups/getallgroups').map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getAllSegmentsByExperience(id): Observable<any> {
        this.getUrl = 'segments/getallsegmentbyexperience'
        return this._http.get(`${this.getUrl}/${id}`).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getSegmentBreadcrum(id): Observable<any> {
        this.getUrl = 'segments/breadcrumbs'
        return this._http.get(`${this.getUrl}/${id}`).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    public getAllExperienceByGroup(gid): Observable<any> {
        this.getUrl = 'experiences/getallexperiencebygroup'
        return this._http.get(`${this.getUrl}/${gid}`).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    public getAllGroupMembers(id): Observable<any> {
        this.getUrl = 'groups/groupmembers'
        return this._http.get(`${this.getUrl}/${id}`).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public createExperience(experience: Experience): Observable<any> {
        let getUrl = 'experiences';
        let body = {
            id: experience.id || "",
            groupId: experience.groupId || "",
            name: experience.name,
            description: experience.description,
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public createGroup(group: Groups): Observable<any> {
        let getUrl = 'groups';
        let body = {
            id: "",
            name: group.name
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public createSegment(segment: Segment): Observable<any> {
        let getUrl = 'segments';
        let body = {
            id: "",
            experienceId: segment.experienceId,
            name: segment.name,
            startLocation: segment.startLocation || "",
            endLocation: segment.endLocation || "",
            tags: ""
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public deleteExperience(id): Observable<any> {
        this.getUrl = 'experiences/deleteexperience'
        let body = {};
        return this._http.put(`${this.getUrl}/${id}`, body).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public deleteGroups(id): Observable<any> {
        this.getUrl = 'groups/deletegroup'
        let body = {};
        return this._http.put(`${this.getUrl}/${id}`, body).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    public deleteSegment(id): Observable<any> {
        this.getUrl = 'segments/deletesegment'
        let body = {};
        return this._http.put(`${this.getUrl}/${id}`, body).map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }


    public updateExperience(experience: Experience, id): Observable<any> {
        this.getUrl = 'experiences';
        let body = {
            id: experience.id || "",
            groupId: experience.groupId || "",
            name: experience.name,
            description: experience.description,
        }

        return this._http.put(`${this.getUrl}/${id}`, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public updateGroup(group: Groups, id): Observable<any> {
        this.getUrl = 'groups';
        let body = {
            id: "",
            name: group.name
        }

        return this._http.put(`${this.getUrl}/${id}`, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public updateSegment(segment: Segment, id): Observable<any> {
        this.getUrl = 'segments';
        let body = {
            id: "",
            name: segment.name
        }

        return this._http.put(`${this.getUrl}/${id}`, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public inviteMembers(g: any): Observable<any> {
        let getUrl = 'groups/invitemember';
        let body = {
            groupId: g.groupId || "",
            invitedBy: g.invitedBy,
            member: g.member
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public getGroupDetail(id: string): Observable<any> {
        let getUrl = 'groups/'+id;
        
        return this._http.get(getUrl)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public AddNewMembers(g: any): Observable<any> {
        let getUrl = 'groups/addnewmemberingroup';
        let body = {
            groupId: g.groupId || "",
            inviteId: g.inviteId,
            userId: g.userId
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public AcceptGroupInvitation(data): Observable<any> {
        this.getUrl = 'groups/acceptgroupinvitation';
        let body = {
            inviteId: data.inviteId,
            userId: data.userId,
            groupId: data.groupId
        }

        return this._http.put(`${this.getUrl}`, body)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }

    public RejectGroupInvitation(id): Observable<any> {
        this.getUrl = 'groups/rejectgroupinvitation';
        let body = {};
        let data = { Id: id };
        return this._http.put(`${this.getUrl}`, body, { params: data })
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }


    public DeleteMember(data): Observable<any> {
        this.getUrl = 'groups/deletemember';
       // let body = { userId: data.userId, groupId: data.groupId, invitationId: data. };
        return this._http.put(`${this.getUrl}`, data)
            .map((res: Response) => res.json())
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }





}
