import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import * as cloneDeep from 'lodash/cloneDeep';
import {forkJoin} from 'rxjs';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  isPhotoValid = true;
  currentProfileCopy: any;

  files: File[] = []; // photos selectionnées pour l'envoi
  photosUrl = []; // url des photos selectionnées pour l'envoi

  isUploading = false;


  @Output() photoDeletedEvent = new EventEmitter<number>();
  @Output() photoSentEvent = new EventEmitter<any>();
  @Output() uploadingEvent = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {

  }

  resetAll() {
    this.files = [];
    this.photosUrl = [];
    this.isPhotoValid = true;
    this.isUploading = false;
  }

  onDeletePhotoFromGallery(index) {
    this.currentProfileCopy.photosUrl.splice(index, 1);
    // this.profileService.updateProfile(this.currentDisplayedProfile);
    // this.photoDeletedEvent.emit(index);
  }

  savePhotosProfile() {
   // this.profileService.updateProfile(cloneDeep(this.currentProfileCopy));
  }


  /************************
   --- Add Tab ---
   ************************/
  onImageAddedFromAddTab(event) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size >1_000_000) {
        this.isPhotoValid = false;
      } else {
        if (!this.files) {
          this.files = [];
        }
        if (!this.photosUrl) {
          this.photosUrl = [];
        }

        this.isPhotoValid = true;
        this.files.push(event.target.files[0]);

        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (evn: Event) => { // called once readAsDataURL is completed
          this.photosUrl.push(reader.result);
        };
      }
    }
  }

  onUploadPhotos() {
    this.uploadingEvent.emit(true);

    const observables = [];
    for (const file of this.files) {
      const uploadData = new FormData();
      uploadData.append('avatar1', file, file.name);
     // observables.push(this.profileService.postPhoto(uploadData));
    }

    forkJoin(observables).subscribe(
      results => {
      console.log('response after uploading all photos = ' + JSON.stringify(results));
      if (results && results.length > 0) {
        for (const photo of results) {
          this.currentProfileCopy.photosUrl.push(photo);
        }
      }
      this.uploadingEvent.emit(false);
      this.resetAll();
    }, error1 => this.uploadingEvent.emit(false));
  }

  removePhotoFromAddTab(position) {
    this.photosUrl.splice(position, 1);
    this.files.splice(position, 1);
  }



  /************************
   --- Drag n Drop ---
   ************************/
  applyDrag(arr, dragResult) {
    const {removedIndex, addedIndex, payload} = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }

    const result = [...arr];
    let itemToAdd = payload;

    if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd);
    }

    return result;
  }

  onDropImage(dropResult) {
    this.currentProfileCopy.photosUrl = this.applyDrag(this.currentProfileCopy.photosUrl, dropResult);
  }


}
