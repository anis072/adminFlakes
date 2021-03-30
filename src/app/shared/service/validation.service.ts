import { Injectable } from '@angular/core';
import {config} from '../config'
@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    return config[validatorName];
  }
}
