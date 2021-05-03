import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ExprtiseService {
  public url ='http://localhost:3050/expertise/';
  constructor(private http:HttpClient) { }
  getExpertises(): Observable<any>{
    return this.http.get(this.url);
  }
  addExpertise(libelle : string): Observable<any>{

    return this.http.post(this.url+'add',libelle);
  }
  delete(id : number){
    return this.http.delete(this.url+'deleteExpertise/'+id);
  }
  getByID(id){
    return this.http.get(this.url+id);
  }
  edit(req){
    return this.http.put('http://localhost:3050/expertise/updateExpertise/',req);
  }
}
