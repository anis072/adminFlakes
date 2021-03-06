import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../side-bar/side-bar.component';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
import { BannerService } from '../service/banner.service';
import { MaquilleuseService } from '../service/maquilleuse.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public focus;
  public listTitles: any[];
  public location: Location;
  sidenavOpen = true;
  nbre:any;

  public innerWidth: any;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private authService: AuthService,
    private maqService : MaquilleuseService
  ) {
    this.location = location;
    this.router.events.subscribe((event: Event) => {
       if (event instanceof NavigationStart) {
           // Show loading indicator

       }
       if (event instanceof NavigationEnd) {
           // Hide loading indicator

           if (window.innerWidth < 1200) {
             document.body.classList.remove('g-sidenav-pinned');
             document.body.classList.add('g-sidenav-hidden');
             this.sidenavOpen = false;
           }
       }

       if (event instanceof NavigationError) {
           // Hide loading indicator

           // Present error to user
           console.log(event.error);
       }
   });

  }
  logout(){
   this.authService.logout();
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.nbreMaq();
  }

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  nbreMaq(){
    this.maqService.getAll().subscribe({
      next:data=>{
        this.nbre = data.length;
      },
      error:err=>{
        console.log(err);
      }
    })
  }

  openSearch() {
    document.body.classList.add('g-navbar-search-showing');
    setTimeout(function() {
      document.body.classList.remove('g-navbar-search-showing');
      document.body.classList.add('g-navbar-search-show');
    }, 150);
    setTimeout(function() {
      document.body.classList.add('g-navbar-search-shown');
    }, 300);
  }
  closeSearch() {
    document.body.classList.remove('g-navbar-search-shown');
    setTimeout(function() {
      document.body.classList.remove('g-navbar-search-show');
      document.body.classList.add('g-navbar-search-hiding');
    }, 150);
    setTimeout(function() {
      document.body.classList.remove('g-navbar-search-hiding');
      document.body.classList.add('g-navbar-search-hidden');
    }, 300);
    setTimeout(function() {
      document.body.classList.remove('g-navbar-search-hidden');
    }, 500);
  }
  openSidebar() {
    if (document.body.classList.contains('g-sidenav-pinned')) {
        document.body.classList.remove('g-sidenav-pinned');
        document.body.classList.add('g-sidenav-hidden');
        this.sidenavOpen = false;
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
      this.sidenavOpen = true;
    }
  }
  toggleSidenav() {
    if (document.body.classList.contains('g-sidenav-pinned')) {
      document.body.classList.remove('g-sidenav-pinned');
      document.body.classList.add('g-sidenav-hidden');
      this.sidenavOpen = false;
    } else {
      document.body.classList.add('g-sidenav-pinned');
      document.body.classList.remove('g-sidenav-hidden');
      this.sidenavOpen = true;
    }
  }
}

