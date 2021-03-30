import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private router :Router) { }
  login(cred){
   return this.http.post('http://localhost:3050/user/login',cred).pipe(map(user=>{
     window.localStorage.setItem('token',JSON.stringify(user));
   }));
  }
  logout(){
    this.router.navigate([''])
  }
}
