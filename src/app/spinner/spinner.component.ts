import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  loading: boolean;
  constructor(private spinner: SpinnerService) {
    this.spinner.isLoading.subscribe((x) => {
      this.loading = x;
    });
  }

  ngOnInit(): void {
  }

}
