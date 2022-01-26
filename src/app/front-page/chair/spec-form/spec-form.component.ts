import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SpecializationService} from "../specialization/specialization.service";
import {MaterializeService} from "../../../includes/materialize.service";
import {SpecData} from "../../../interfaces";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-spec-form',
  templateUrl: './spec-form.component.html',
  styleUrls: ['./spec-form.component.css']
})
export class SpecFormComponent implements OnInit {

  @Input() chairId: string = '';
  @Input() specData: SpecData = <SpecData>{};
  @Output() reloadList = new EventEmitter();

  errors: string = '';

  constructor(private specService: SpecializationService) { }

  ngOnInit(): void {
  }

  specSubmit(nameSpec: NgModel): void {
      if (nameSpec.control.status !== 'INVALID') {
          const data = this.specData;
          data.chair = this.chairId;
          console.log(data);

          if (data._id && data._id !== '') {
              this.specService.update(data._id, data).subscribe(
                  response => {
                      this.reloadList.emit();
                      data.name = '';
                      data.description = '';
                      MaterializeService.toast(`Specialization updated.`);
                  },
                  error => {
                      this.errors = error.error.error;
                      console.log(error);
                  },
              );
          } else {
              this.specService.add(data).subscribe(
                  response => {
                      this.reloadList.emit();
                      data.name = '';
                      data.description = '';
                      MaterializeService.toast(`Specialization added.`);
                  },
                  error => {
                      this.errors = error.error.error;
                      console.log(error);
                  },
              );
          }

      } else {
          MaterializeService.toast('Fill all required fields!', 'red');
      }
  }

}
