import { Injectable } from '@angular/core';

declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class MaterializeService {

  constructor() { }

  static toast(html: string, classes: string = '') {
      M.toast({html, classes});
  }

  static modal(element: any): any {
    return M.Modal.init(element);
  }

  static datepicker(element: any, options: object = {}): any {
    return M.Datepicker.init(element, options);
  }

}
