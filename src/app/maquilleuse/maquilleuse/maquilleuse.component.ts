import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MaquilleuseService } from 'src/app/layouts/service/maquilleuse.service';
import swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { MaquManagmentComponent } from '../maqu-managment/maqu-managment.component';
import { ExportService } from 'src/app/service/export.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
@Component({
  selector: 'app-maquilleuse',
  templateUrl: './maquilleuse.component.html',
  styleUrls: ['./maquilleuse.component.css']
})
export class MaquilleuseComponent implements OnInit {
  public focus;
  maquillieuses$ =[]
  _maquilleuse;
  maq;
  filtredmaq:any;
  bsModalRef: BsModalRef;
  subscription: Subscription = new Subscription();
  get maquilleuseSearch() {
    return this._maquilleuse;
  }
  set maquilleuseSearch(value: string) {
    this._maquilleuse = value;
    this.filtredmaq = this.maquilleuseSearch
      ? this.search(this.maquilleuseSearch)
      : this.maquillieuses$;
  }
  constructor(private maqService : MaquilleuseService,
              private modalService: BsModalService,
              private exportService : ExportService) { }

  ngOnInit(): void {
     this.getAll();
  }

  getAll(){
   this.maqService.getAll().subscribe({
     next : data=>{
      console.log(data);
      this.maquillieuses$ = data;
      this.filtredmaq = data;
         },
     error: err=>{
       console. log(err)
     }
   })
  }
  getMaqById(username){
    this.maqService.getMaq(username).subscribe({
     next: data=>{
       this.maq = data;
     },
     error :err=>{
       console.log(err);
     }
    });
   }
  exportToCv(id){
    console.log(id);
    this.maqService.getMaq(id).subscribe({
      next: data=>{
        console.log(data);
        this.maq = data;
        console.log(this.maq)
      },
      error :err=>{
        console.log(err);
      }
     });
   setTimeout(()=>{
    this.exportService.exportToCsv(this.maq, "user-data", [
      "business",
      "cities",
      "emailAdress",
      "expertises",
      "firstname",
      "lastname",
      "movings",
      "slogan",
      "street",
      "username",
    ]);
   },1000)


  }
  openModal(id) {
    const initialState = {
      itemId: id,
    };
    this.bsModalRef = this.modalService.show(MaquManagmentComponent, {
      initialState,
    });
    this.subscription.add(
      this.bsModalRef.content.event.subscribe((data) => {
        if (data == "ok") {
          this.getAll();
        }
      })
    );
  }

    delete(id) {
      swal
        .fire({
          title: "Alerte",
          text: "voulez vous supprimer cet Maquilleuse?",
          buttonsStyling: false,
          confirmButtonClass: "btn bg-gradient-info text-white",
          cancelButtonText: "Annuler",
          showCloseButton: true,
        })
        .then((result) => {
          if (result.dismiss) {
          } else {
            this.subscription.add(
              this.maqService.delete(id).subscribe({
                next: (data) => {
                  this.getAll();
                },
              })
            );
          }
        });
    }
   search(searchBy){
    searchBy = searchBy.toLocaleLowerCase();
    return this.maquillieuses$.filter((exp) =>
      exp.firstname.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      exp.lastname.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
      exp.emailAdress.toLocaleLowerCase().indexOf(searchBy) !== -1

    );

   }

  }


