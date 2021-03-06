import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ExprtiseService } from 'src/app/layouts/service/exprtise.service';
import { ToAstrService } from 'src/app/layouts/service/toAstr.service';

@Component({
  selector: 'app-expertise-managment',
  templateUrl: './expertise-managment.component.html',
  styleUrls: ['./expertise-managment.component.css']
})
export class ExpertiseManagmentComponent implements OnInit {
  maqForm : FormGroup;
  maqEditForm : FormGroup;
  expertise:any={};
  itemId;
  submited : boolean;
  event: EventEmitter<any> = new EventEmitter();
  constructor(private fb : FormBuilder,
              private modalService : BsModalService,
              private expertiseService :ExprtiseService,
              private toastr : ToAstrService) { }
  ngOnInit(): void {
  this.init_Form();
  if(this.itemId != ''){
    this.inti_edit();
    this.getExpertise();
  }
  }
  init_Form() {
   this.maqForm = this.fb.group({
    lebelle : ['',Validators.required],
    type :['',Validators.required]
   });
  }
  inti_edit(){
    this.maqEditForm = this.fb.group({
      idExpertise :[JSON.stringify(this.itemId)],
      lebelle : ['',Validators.required],
      type :['',Validators.required]
     });
  }
  getExpertise(){

    this.expertiseService.getByID(this.itemId).subscribe({
      next: data=>{
        this.expertise = data;
        console.log(this.expertise);
      },
      error :err=>{
        this.toastr.danger('Erreur','Erreur')
      }
    })
  }

  submit(){
    this.submited =true;
    if(this.itemId != ''){
      if(this.maqEditForm.invalid){
        return;
      }
      alert(JSON.stringify(this.maqEditForm.value))
      this.expertiseService.edit(this.maqEditForm.value).subscribe({
       next: data=>{
        this.toastr.success('Expertise mis a jour avec succeés','Sucess');
        this.modalService.hide(1);
        this.event.emit("ok");
        window.location.reload();

       },
       error: err=>{
         this.toastr.danger('Erreur','Erreur');
       }
      })
    }
    else {
      if(this.maqForm.invalid){
        return;
      }
      this.expertiseService.addExpertise(this.maqForm.value).subscribe({
        next: data=>{
          this.toastr.success('Expertise ajouté avec succeés','Sucess');
          this.modalService.hide(1);
          this.event.emit("ok");
        },
        error:err=>{
          this.toastr.danger('Un problem au serveur','Attention');
        }
      })
    }

  }
  onHide(){
    this.modalService.hide(1);
  }



}
