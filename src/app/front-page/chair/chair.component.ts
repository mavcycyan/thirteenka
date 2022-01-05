import { Component, OnInit } from '@angular/core';
import {MaterializeService} from "../../includes/materialize.service";

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tst(): void {
    MaterializeService.toast('Some text!');
  }

  mdl(mdl: any): void {
    const mtr = MaterializeService.modal(mdl);
      mtr.open();
  }

}
