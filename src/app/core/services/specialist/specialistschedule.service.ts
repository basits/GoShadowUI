import { Headers, Response, Http, RequestOptions } from '@angular/http';
import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { HttpService } from "../base/http.service";
import { AuthService} from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


import { environment } from "../../../../environments/environment";

@Injectable()
export class SpecialistScheduleService
{
   

    constructor(private _http: HttpService,private _authServices: AuthService) {}
    invokeEvent: Subject<any> = new Subject(); 
    
          callMethodOfSecondComponent() { 
            this.invokeEvent.next('refresh')      
          }

    getOffDays(year,month,range): Observable<any> 
    {
        return this._http.get("specialist/offdays/"+year+"/"+month+"/"+range) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }
    getHolidays(year): Observable<any> 
    {
        return this._http.get("annual/holidays/"+year) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }
    getSchedule(year,month): Observable<any> 
    {
        return this._http.get("specialist/schedule/"+year+"/"+month) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }
    getScheduleDay(year,month,day): Observable<any> 
    {
        return this._http.get("specialist/schedule/"+year+"/"+month+"/"+day) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

    setOffDays(id,offDay,isMarked): Observable<any> 
    {
  
        let body={}
         body['OffDays'] = [ {
            offDay: offDay,
            isMarked:isMarked,
            id:id
        }]
        return this._http.put("specialist/offdays",body) .catch((err, caught) => {
            return Observable.throw(err);
        });
    }

}
export class OffDays
{
    id: any;
    offDay: any;
    isMarked: any;
}
export class Holidays
{
    holidayOn: any;
    holidayName: any;
}
export class Schedule
{
    scheduleDate: any;
    details: details[];
    
}
export class details
{
    partnerSiteName: any;
    specialistName: any;
    spcialistContactNumber: any;
    priority: any;
    shiftStartTime: any;
    shiftStartTimeInUTC:any;
    shiftEndTime: any;
    shiftEndTimeInUTC:any;
    utcDSTOffsetInSeconds:any;
}


