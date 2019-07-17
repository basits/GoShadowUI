
import { HttpService } from '../base/http.service';
import { Http, RequestOptionsArgs, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class OrganizationService {

    getUrl: string;
    constructor(private _http: HttpService) { }

    public getDesignations(): Observable<any> {
        return this._http.get('designation/all').map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getDepartments(): Observable<any> {
        this.getUrl = 'department/all';
        return this._http.get(`${this.getUrl}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    public getRolesViaDepartmentId(roleId: any): Observable<any> {
        // this.getUrl = 'role';
        this.getUrl = 'role/via/department';
        return this._http.get(`${this.getUrl}/${roleId}`)
            .map((res: Response) => res)
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    createUser(user): Observable<any> {
        // let getUrl = 'add/user';
        let getUrl = 'user/add';
        let body = {
            SapId: user.sapId,
            UserEmail: user.email,
            UserPassword: user.password,
            ConfirmPassword: user.confirmPassword,
            FirstName: user.firstName,
            LastName: user.lastName,
            CountryId: user.countryId,
            RegionId: user.regionId,
            CityId: user.cityId,
            BranchId: user.branchId,
            DesignationId: user.designationId,
            DepartmentId: user.departmentId,
            UserRolePermission: {
                RoleId: user.userRolePermission.roleId,
            },
        }

        return this._http.post(getUrl, body)
            .map((res: Response) => res)
            .catch((err, caught) => {
                return Observable.throw(err);
            })
    }
}
