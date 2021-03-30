import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor( private http:HttpClient) { }
  postPhoto(uploadData) {
    return this.http.post('http://82.165.253.223:3050/files/upload', uploadData);
  }
  postPhotos(photo){
    return this.http.post('http://localhost:3050/banierePubliciataire/add',{"imageUrl":photo})
  }
  getPhoto(){
    return this.http.get('http://localhost:3050/banierePubliciataire/all');
  }
  delete(id){
    return this.http.delete('http://localhost:3050/banierePubliciataire/deleteBanierePublicitaire/'+id);
  }
}
