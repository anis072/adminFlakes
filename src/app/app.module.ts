import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {​​ BrowserAnimationsModule }​​ from '@angular/platform-browser/animations'
import { AppComponent } from './app.component';
import { MaquilleuseComponent } from './maquilleuse/maquilleuse/maquilleuse.component';
import { HttpClientModule } from '@angular/common/http';
import { MaquManagmentComponent } from './maquilleuse/maqu-managment/maqu-managment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
import { ExpertiseComponent } from './expertise/expertise/expertise.component';
import { ExpertiseManagmentComponent } from './expertise/expertise-managment/expertise-managment.component';
import { LoginComponent } from './login/login.component';
import { ButtonsModule } from 'ngx-bootstrap';
import { TabViewModule } from 'primeng/tabview';
import { DetailComponent } from './maquilleuse/detail/detail.component'
import { AuthGuard } from './service/auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    MaquilleuseComponent,
    MaquManagmentComponent,
    ExpertiseComponent,
    ExpertiseManagmentComponent,
    LoginComponent,
    DetailComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    SharedModule,
    TabViewModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {
        path: 'eval',
        loadChildren: () => import('./layouts/layouts.module').then(m => m.LayoutsModule),
        canActivate:[AuthGuard]
      },
      {
        path:'',
        component :LoginComponent
      }
    ])
  ],

  providers: [BsModalRef],
  entryComponents:[MaquManagmentComponent],
  bootstrap: [AppComponent],

})
export class AppModule { }
