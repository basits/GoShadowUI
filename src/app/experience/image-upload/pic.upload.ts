import { Component, ElementRef, Input, Inject } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Http, Response } from '@angular/http';
import { IAuthService } from '../../core/services/auth/iauth.service';
import { User } from '../../core/models/user';
import { environment } from '../../../environments/environment.prod';


let URL = '';


@Component({
  selector: 'upload-pic',
  templateUrl: './pic.upload.component.html',
  styleUrls: ['./file.upload.component.css']
})
export class PicUpload {

  @Input() noteId;

  newUser: User = new User();
  apiUrl = environment.apiBaseUrl;
  imageTypeError = false;


  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(@Inject('IAuthService') private _authService: IAuthService,
    private http: Http, private el: ElementRef
  ) {



  }



  public fileOverBase(e: any): void {
    console.log('file recived ', e);
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    console.log('file another', e);
    this.hasAnotherDropZoneOver = e;
  }

  ngOnInit() {

    URL = this.apiUrl + 'notes/uploadphoto';
    //URL = this.apiUrl + 'as/sss';

    const token = this._authService.getToken();
    console.log('token', token);

    this.uploader = new FileUploader(
      {
        authToken: "bearer" + token,
        url: URL, additionalParameter: { Id: this.noteId }
        //   headers: [{
        //     name: 'Authorization bearer ',
        //     value: token
        //   },
        //  ]


      });
    // this.uploader.setOptions(uo)
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => {
      console.log('this.uploader.queue.length', this.uploader.queue.length);

      //checking the type of file, if it is not image then return
      if (file.file.type.search('image') == -1) {
        this.imageTypeError = true;
        return;
      } else {
        this.imageTypeError = false;
        console.log('uploadfile.type...', file.file.type.search('image'));
      }

      console.log('file property', file);
      // this.uploader.clearQueue();
      console.log('uploader...', this.uploader);
      console.log('getReadyItems...', this.uploader.getReadyItems());
      console.log('getNotUploadedItems...', this.uploader.getNotUploadedItems());

      file.withCredentials = false;
    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

      console.log('ImageUpload:uploaded:', item, status, response);
      console.log('uploader...', this.uploader);

      // const res = JSON.parse(response);
      // this.newUser = this._authService.getUser();
      // if (res.genericResponse.genericBody.data.profilePicture) {
      //   this.newUser.profilePic = res.genericResponse.genericBody.data.profilePicture;
      // }
      // this._authService.storeUser(this.newUser);
      //window.location.reload();
    };


  }




}




