import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { ExprtiseService } from '../../layouts/service/exprtise.service'
import { ExpertiseManagmentComponent } from '../expertise-managment/expertise-managment.component';
import  swal  from 'sweetalert2';
import {PageEvent} from "@angular/material/paginator";
@Component({
  selector: 'app-expertise',
  templateUrl: './expertise.component.html',
  styleUrls: ['./expertise.component.css']
})
export class ExpertiseComponent implements OnInit {
  expertises$=[];
  bsModalRef: BsModalRef;
  focus;
  pageSize=5;
  nbMaquillage=0;
  nbExentesion=0;
  nbManucure=0;
  nbMicroblading=0;
  public pageSlice = [];
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
    this.pageSlice = this.filtredExpertises.slice(0, this.pageSize);


  }
  constructor(private expertiseService: ExprtiseService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getExpertises();
  }

  getTypesNumber(expertise:any){
    for(let item of expertise){
      switch (item.type){
        case "extension":
          this.nbExentesion++;
          break;
        case "MicroBlading":
          this.nbMicroblading++;
          break;
        case "Manucure":
          this.nbManucure++;
          break;
        case "Maquillage":
          this.nbMaquillage++;
          break;
        default:
          console.log('sd')
          ;
      }
    }
  }
  getExpertises() {
    this.expertiseService.getExpertises().subscribe({
      next: data => {
        this.expertises$ = data;
        this.nbMaquillage=0;
        this.nbManucure=0;
        this.nbMicroblading=0;
        this.nbExentesion=0;
        this.getTypesNumber(this.expertises$);
        this.filtredExpertises = data;
        this.pageSlice = this.filtredExpertises.slice(0, this.pageSize);
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
  onPageChange(event: PageEvent) {

    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.filtredExpertises.length) {
      endIndex = this.filtredExpertises.length;
    }
    this.pageSlice = this.filtredExpertises.slice(startIndex, endIndex);

  }

}
