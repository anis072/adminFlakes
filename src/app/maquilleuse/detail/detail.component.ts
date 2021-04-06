import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MaquilleuseService } from 'src/app/layouts/service/maquilleuse.service';
import swal from 'sweetalert2'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
 maq:any;
 id:any;
  constructor(private maqService :MaquilleuseService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMaq();
    this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    this.id = params['id'] //log the value of id
    });
  }
  getMaq(){
    this.maqService.getAll().subscribe({
      next: data=>{
        console.log(data);
       this.maq = data.filter(data => data.idMaquilleuse === parseInt(this.id));
       console.log(this.maq)
      }
    })
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
            this.maqService.deletePhoto(id).subscribe({
              next: (data) => {
              this.getMaq();
              },
              error:err=>{
                console.log(err);
              }
            })

        }
      });
  }
}
