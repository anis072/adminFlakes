import { Injectable } from '@angular/core';
import {​​ ToastrService }​​ from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToAstrService {

  constructor(private toastr: ToastrService ) {​​​​ }​​​​

  public success(message,title){​​​​

    this.toastr.show(

      '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">'+title+'</span> <span data-notify="message">'+message+'</span></div>',

      "",

      {​​​​

        timeOut: 2000,

        closeButton: true,

        enableHtml: true,

        tapToDismiss: false,

        titleClass: "alert-title",

        positionClass: "toast-top-center",

        toastClass:

          "ngx-toastr alert alert-dismissible alert-success alert-notify"

      }​​​​

    );

  }​​​​
  public warning(message,title){
    this.toastr.show(

      '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">'+title+'</span> <span data-notify="message">'+message+'</span></div>',

      "",

      {​​​​

        timeOut: 2000,

        closeButton: true,

        enableHtml: true,

        tapToDismiss: false,

        titleClass: "alert-title",

        positionClass: "toast-top-center",

        toastClass:

          "ngx-toastr alert alert-dismissible alert-warning alert-notify"

      }​​​​

    );
  }
  public danger(message,title){​​​​

    this.toastr.show(

      '<span class="alert-icon ni ni-bell-55" data-notify="icon"></span> <div class="alert-text"</div> <span class="alert-title" data-notify="title">'+title+'</span> <span data-notify="message">'+message+'</span></div>',

      "",

      {​​​​

        timeOut: 2000,

        closeButton: true,

        enableHtml: true,

        tapToDismiss: false,

        titleClass: "alert-title",

        positionClass: "toast-top-center",

        toastClass:

          "ngx-toastr alert alert-dismissible alert-danger alert-notify"

      }​​​​

    );

  }​​​​
}
