import { BaseModel } from "./base.model";

export class Segment extends BaseModel {

    id: number;
    name: string;
    status: string;
    updatedAt: string;
    endLocation: string;
    startLocation: string;
    experienceId: string;


}