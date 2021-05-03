import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm:FormGroup;
  Error;

  constructor(private fb : FormBuilder,
              private authService :AuthService ,
              private router :Router) { }

  ngOnInit(): void {
 this.init_Form();
  }
  init_Form(){
    this.loginForm =this.fb.group({
      email :['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  onSubmit(){
   this.authService.login(this.loginForm.value).subscribe({
     next: data=>{
       console.log(data);
       this.router.navigate(['eval/maquilleuse']);
     },
     error:err=>{
       this.Error= "Err";
     }
   })
   }
}
