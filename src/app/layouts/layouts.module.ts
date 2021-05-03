import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './side-bar/side-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContainerComponent } from './container/container.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Router, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { DxVectorMapModule } from 'devextreme-angular';
import { BsDropdownModule, BsModalService } from 'ngx-bootstrap';
import { MaquilleuseComponent } from '../maquilleuse/maquilleuse/maquilleuse.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ToAstrService } from './service/toAstr.service';
import { ExpertiseComponent } from '../expertise/expertise/expertise.component';
import { BannerComponent } from '../banner/banner/banner.component';
import { ExportService } from '../service/export.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailComponent } from '../maquilleuse/detail/detail.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [SidebarComponent,HeaderComponent,FooterComponent,ContainerComponent,BannerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    DxVectorMapModule,
    HttpClientModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot(),
    RouterModule.forChild([
      {
        path:'',
        component:ContainerComponent,
        children: [{
          path:'maquilleuse',
          component:MaquilleuseComponent
        },
        {
          path:'expertise',
          component :ExpertiseComponent
        },
        {
          path:'banner',
          component : BannerComponent
        },
        {
          path:'detail/:id',
          component: DetailComponent
        }
      ]
      }
    ])
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    BsModalService,
    ToAstrService,
    ExportService
  ]
})
export class LayoutsModule { }
