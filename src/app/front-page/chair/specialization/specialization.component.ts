import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecData} from "../../../interfaces";
import {SpecializationService} from "./specialization.service";
import {MaterializeService} from "../../../includes/materialize.service";

@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css']
})
export class SpecializationComponent implements OnInit {

  @Input() list: SpecData[] = [];
  @Output() specDataEmit = new EventEmitter<SpecData>();
  @Output() reloadList = new EventEmitter();

  constructor(private specService: SpecializationService) { }

  ngOnInit(): void {
  }

  getSpecData(id: string = ''): void {
    this.specService.getById(id).subscribe( response => {
        const data = response;
        data._id = id;
        this.specDataEmit.emit(data);
    } );
  }

  deleteSpec(id: string = ''): void {
    this.specService.delete(id).subscribe( response => {
        MaterializeService.toast('Specialization deleted.');
        this.reloadList.emit();
    } );
  }

}
