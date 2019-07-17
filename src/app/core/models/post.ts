import { BaseModel } from "./base.model";

export class Post extends BaseModel {

    postId: number;
    postName: string;
    postImage: string;
    email: string;
}