import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../service/validation.service';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
  styleUrls: ['./validator-message.component.css']
})
export class ValidatorMessageComponent implements OnInit {
  @Input() control: AbstractControl;
  constructor() { }

  ngOnInit(): void {
  }
  get errorMessage() {
    let msg: any = null;
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && (this.control.touched )) {
        msg = ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
        if (!msg) {
          msg = null;
        }
      }
    }
    return msg;
  }
}
