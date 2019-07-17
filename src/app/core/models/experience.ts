import { BaseModel } from "./base.model";

export class Experience extends BaseModel {

    id: number;
    name: string;
    status: string;
    groupId: string;
    description : Array<any>;
  
 
}