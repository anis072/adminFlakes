import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { ExprtiseService } from '../../layouts/service/exprtise.service'
import { ExpertiseManagmentComponent } from '../expertise-managment/expertise-managment.component';
import  swal  from 'sweetalert2';
@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {
  expertises$=[];
  bsModalRef: BsModalRef;
  focus;
  filtredExpertises
  _expertise;
  get expertiseSearch() {
    return this._expertise;
  }
  set expertiseSearch(value: string) {
    this._expertise = value;
    this.filtredExpertises = this.expertiseSearch
      ? this.search(this.expertiseSearch)
      : this.expertises$;
  }
  constructor(private expertiseService: ExprtiseService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getExpertises();
  }
  getExpertises() {
    this.expertiseService.getExpertises().subscribe({
      next: data => {
        this.expertises$ = data;
        this.filtredExpertises = data;
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }
  openModal(id) {
    const initialState = {
      itemId: id,
    };
    console.log(id);
    this.bsModalRef = this.modalService.show(ExpertiseManagmentComponent, {
      initialState,
    });
    this.bsModalRef.content.event.subscribe((data) => {
      if (data == "ok") {
        console.log('here anis');
        this.getExpertises();
      }
    });
  }
  delete(id) {
    swal
      .fire({
        title: "Alerte",
        text: "voulez vous supprimer cette Expertise?",
        buttonsStyling: false,
        confirmButtonClass: "btn bg-gradient-info text-white",
        cancelButtonText: "Annuler",
        showCloseButton: true,
      })
      .then((result) => {
        if (result.dismiss) {
        } else {

            this.expertiseService.delete(id).subscribe({
              next: (data) => {
                this.getExpertises();
              },
            })

        }
      });
  }
  search(searchBy){
    searchBy = searchBy.toLocaleLowerCase();
    return this.expertises$.filter((exp) =>
      exp.libelle.toLocaleLowerCase().indexOf(searchBy) !== -1

    );

  }


}
