import { Injectable, ElementRef } from '@angular/core';
import * as FileSaver from 'file-saver';

const CSV_EXTENSION = '.csv';
const CSV_TYPE = 'text/plain;charset=utf-8';


@Injectable()
export class ExportService {
  rows =[];
  constructor() { }


  /**
   * Saves the file on client's machine via FileSaver library.
   *
   * @param buffer The data that need to be saved.
   * @param fileName File name to save as.
   * @param fileType File type to save as.
   */
  private saveAsFile(buffer: any, fileName: string, fileType: string): void {
    const data: Blob = new Blob([buffer], { type: fileType });
    FileSaver.saveAs(data, fileName);
  }

  /**
   * Creates an array of data to csv. It will automatically generate title row based on object keys.
   *
   * @param rows array of data to be converted to CSV.
   * @param fileName filename to save as.
   * @param columns array of object properties to convert to CSV. If skipped, then all object properties will be used for CSV.
   */
  public exportToCsv(rowse: object[], fileName: string, columns?: string[]): string {
    console.log('eeeeeeeeee');

     console.log(rowse)
     this.rows.push(rowse)
     console.log(this.rows)
     console.log(this.rows.length);
    if (!this.rows || !this.rows.length) {
      return;
    }
    console.log('eeeeeeeeesss')

    const separator = ',';
    const keys = Object.keys(this.rows[0]).filter(k => {
      if (columns.length) {
        return columns.includes(k);
      } else {
        return true;
      }
    });
    console.log('aaaaaaaaaaaaaaaaaakk')
    const csvContent =
      keys.join(separator) +
      '\n' +
      this.rows.map(row => {
        return keys.map(k => {
          let cell = row[k] === null || row[k] === undefined ? '' : row[k];
          if(Array.isArray(row[k])){
            console.log(true)
            console.log(k);
            if(k === "business"){
              let rowBusiness = row[k].map(data=>data.libelle);
             cell =rowBusiness.toString();
            }
            if(k=== "expertises"){
              let rowExpertises = row[k].map(data => data.libelle);
              cell = rowExpertises.toString();
            }
          }
           if(typeof row[k] === 'object' && row[k] !== null && k !== "expertises" && k !== "business" ) {
           console.log(row[k].city);
           cell = "city:"+row[k].city+" code :"+ row[k].code+" departement:"+row[k].department_code?.name;
          }
          else {
            cell = cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""');
          if (cell.search(/("|,|\n)/g) >= 0) {
            cell = `"${cell}"`;
          }

          }
          return cell;
        }).join(separator);
      }).join('\n');
      console.log('here')
    this.saveAsFile(csvContent, `${fileName}${CSV_EXTENSION}`, CSV_TYPE);
  }
}
