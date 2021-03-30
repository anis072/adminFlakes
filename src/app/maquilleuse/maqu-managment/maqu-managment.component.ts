import { Component, OnInit,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap';
import { MaquilleuseService } from 'src/app/layouts/service/maquilleuse.service';
import { ToAstrService } from 'src/app/layouts/service/toAstr.service';

@Component({
  selector: 'app-maqu-managment',
  templateUrl: './maqu-managment.component.html',
  styleUrls: ['./maqu-managment.component.css']
})
export class MaquManagmentComponent implements OnInit {
  maqForm : FormGroup;
  itemId;
  maq :any;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private fb : FormBuilder,
              private modalService : BsModalService,
              private maqService : MaquilleuseService,
              private toastrService: ToAstrService) { }

  ngOnInit(): void {
    console.log(this.itemId)
    this.inti_Form();
    this.getMaqById(this.itemId);
  }
  getMaqById(username){
   this.maqService.getMaq(username).subscribe({
    next: data=>{
      this.maq = data;
      console.log(data);
    },
    error :err=>{
      console.log(err);
    }
   });
  }
  submit(){
    const  {
      firstname,
      lastname,
      emailAdress,
      nbImages,
      phone,
      username,
      street,
      expertises,
      cities,
      slogan,
      password,
      photosUrl,
      business
    } = this.maqForm.value;
    const editRequest ={
      firstname,
      idMaquilleuse:this.maq.idMaquilleuse,
      lastname,
      emailAdress,
      phone,
      nbImages,
      username:this.maq.username,
      street,
      slogan,
      photo_profile:'http://localhost:3050/uploads/img2.jpg',
      expertises:this.maq.expertises,
      password:this.maq.password,
      movings:this.maq.movings,
      photosUrl :this.maq.photosUrl,
      cities:this.maq.cities,


    }
    console.log(editRequest);
    this.maqService.edit(editRequest).subscribe({
      next:data=>{
        console.log(data);
        this.toastrService.success('Maquillieuse est Modifier avec succeés', 'Succès');
        this.modalService.hide(1);
        window.location.reload();
        this.event.emit("ok");
      },
      error:err=>{
        console.log(err);
      }
    })
  }
  onHide() {
    this.modalService.hide(1);
  }
  inti_Form(){
    this.maqForm = this.fb.group({
      firstname:['',Validators.required],
      lastname : ['',Validators.required],
      emailAdress:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      slogan:['',Validators.required],
      street : ['',Validators.required],
      nbImages: ['',Validators.required],
      cities : [''],
    });
  }


}
