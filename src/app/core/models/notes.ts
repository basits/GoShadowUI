

export class Notes {

    notesId: string;
    text: string;
    type: string;
    status: string;
    segmentId: string;
    isFavourite: boolean;
    isLike: boolean;
    isDisLike: boolean;
    pictureurl: string;
    tags: string[];
    isStart: string;
    timerId: string;
    duration: string;
    endtime: string;
    starttime: string;
    timeleft: string;
    check: boolean = false;
    display: string;
    seconds: number = 0;
    minutes: number = 0;
    hours: number = 0;
    t;
    h1;
    isShow: boolean;
    files: any;
}

export class NoteImagesFiles {
    id: string;
    file: any;
    mimeType: string;
    isShow: boolean;
}