import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaquilleuseService {
  public url ='http://localhost:3050/maquilleuse/';

  constructor(private http : HttpClient) { }
  getAll(): Observable<any>{
    return this.http.get(this.url+'all');
  }
  getMaq(username){
    return this.http.get(this.url+username)
  }
  delete(id : number){
   return  this.http.delete(this.url+'deleteMaquilleuse/'+id)
  }
  edit(username){
    return this.http.put(this.url+'updateMaquilleuse',username);
  }
}
