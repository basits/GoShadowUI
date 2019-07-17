import { BaseModel } from "./base.model";

export class Groups extends BaseModel {

    id: number;
    name: string;
    status: string;
    updatedAt: string;
    usersGroups : Array<any>;
    experiences : Array<any>;

    
}