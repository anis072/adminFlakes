import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { BannerService } from 'src/app/layouts/service/banner.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  growlMessage: Message[] = [];
  formImage:FormGroup;
  isUploading = false;
  files: File[] = [];
  isPhotoValid = true;
  photosUrl = [];
  constructor(private bannerService: BannerService,
            private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formImage =this.fb.group({
      image : ['',Validators.required]
    })
  }
  deleteFromGallery(index) {
  }
  uploadPhotos(event){
    console.log(event.target.files)

    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].size > 1_000_000) {
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
        console.log(this.files.length)
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = (evn: Event) => { // called once readAsDataURL is completed
          this.photosUrl.push(reader.result);
        };
      }
      console.log(this.photosUrl);
    }

    const observables = [];

    for (const file of this.files) {
      const uploadData = new FormData();
      uploadData.append('avatar1', file, file.name);
      observables.push(this.bannerService.postPhoto(uploadData));
    }
    forkJoin(observables).subscribe(
      results => {
      console.log('response after uploading all photos = ' + JSON.stringify(results));


    }, error1 => {
      console.log(error1)
    }
    )

  }
}
