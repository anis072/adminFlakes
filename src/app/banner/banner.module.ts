import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { BrowserModule }  from '@angular/platform-browser';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ ProfilePictureComponent],
  imports: [
    CommonModule,
    BrowserModule,
  ],
  exports :[]
})
export class BannerModule { }
