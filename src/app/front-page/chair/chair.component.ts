import { Component, OnInit } from '@angular/core';
import {MaterializeService} from "../../includes/materialize.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChairService} from "./chair.service";
import {ChairData, SpecData} from "../../interfaces";
import {SpecializationService} from "./specialization/specialization.service";

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

  /**chair component properties**/

  form: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
  });

  chairsList: ChairData[] = [];

  chairId: string = '';

  errors: string = '';

  /**chair component properties**/


  /**specialization components properties**/

  specList: SpecData[] = [];

  setSpecData: SpecData = <SpecData>{};

  specFormActive: boolean = false;

  /**specialization components properties**/


  constructor(
      private chairService: ChairService,
      private specService: SpecializationService) { }


  /**chair component methods**/

  ngOnInit(): void {
      this.listLoad();
  }

  listLoad(): void {
      this.chairService.getAll().subscribe( newData => {
          this.chairsList = newData;
      })
  }

  addNew(mdl: any, id: string = ''): void {
      const mtr = MaterializeService.modal(mdl);
      mtr.open();
      if (id !== '') {
          this.chairId = id;
          this.getSpecList(id);
          this.chairService.getById(id).subscribe( (data: ChairData) => {
              if (data) {
                  this.form.patchValue({
                      name: data.name,
                      description: data.description
                  })
              }
          })
      } else {
          this.chairId = '';
          this.form.patchValue({
              name: '',
              description: ''
          })
      }
  }

  submitForm(mdl: any): void {
      if (this.form.status !== 'INVALID') {
          const data = this.form.value;

          if (this.chairId !== '') {
              this.chairService.update(this.chairId, data).subscribe(
                  response => {
                      const mtr = MaterializeService.modal(mdl);
                      this.listLoad();
                      mtr.close();
                      this.chairId = '';
                  },
                  error => {
                      this.errors = error.error.error;
                      console.log(error);
                  },
              );
          } else {
              this.chairService.add(data).subscribe(
                  response => {
                      const mtr = MaterializeService.modal(mdl);
                      this.listLoad();
                      mtr.close();
                      this.chairId = '';
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

  rmModal(mdl: any, id: string = ''): void {
      const mtr = MaterializeService.modal(mdl);
      mtr.open();
      this.chairId = id;
  }

  removeChair(mdl: any, id: string): void {
      this.getSpecList(id);
      this.chairService.delete(id).subscribe(
          response => {
              MaterializeService.modal(mdl).close();
              MaterializeService.toast(`Chair removed.`);
              this.chairId = '';
              this.listLoad();
          },
          error => {
              MaterializeService.toast(`Some error occurred!`);
              console.log(error.error.error);
          }
      );
  }

  /**chair component methods**/


  /**specialization components methods**/

  getSpecList(chairId: string = ''): void {
      this.chairId = chairId;
      this.specService.getAllByChair(chairId).subscribe(
          response => {
              this.specList = response;
          }
      )
  }

  getSpec(spec: SpecData): void {
      this.specFormActive = true;
      this.setSpecData = spec;
  }

  showSpecForm(): void {
      this.specFormActive = !this.specFormActive;
      if (!this.specFormActive) {
          this.setSpecData = {
              _id: '',
              name: '',
              description: '',
              chair: this.chairId
          }
      }
  }

  reloadSpecList(): void {
      this.getSpecList(this.chairId);
      this.specFormActive = false;
  }

  /**specialization components methods**/













}
