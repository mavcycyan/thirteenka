import { Injectable } from '@angular/core';

declare var M: any;

@Injectable({
  providedIn: 'root'
})
export class MaterializeService {

  constructor() { }

  static toast(message: string) {
    M.toast({html: message});
  }

  static modal(element: any): any {
    return M.Modal.init(element);
  }

}
