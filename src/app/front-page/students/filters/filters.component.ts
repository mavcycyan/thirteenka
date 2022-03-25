import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs/index";
import {debounceTime, switchMap} from "rxjs/internal/operators";
import {StudentsService} from "../students.service";
import {ChairData, SpecData} from "../../../interfaces";
import {NouisliderService} from "../../../includes/nouislider.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  private subject: Subject<string> = new Subject();

  chairs: ChairData[] = [];
  specializations: SpecData[] = [];

  constructor(private studentsService: StudentsService) {
    this.subject.pipe(
        debounceTime(500),
        switchMap ( value => {return this.studentsService.getAll(value)} )
    ).subscribe( response => {
        console.log(response);
    })
  }

  ngOnInit(): void {
    this.studentsService.getAllChairs().subscribe( chairs => {
      this.chairs = chairs;
    } );
    const date = new Date().getFullYear();
    console.log(date);
    NouisliderService.create(document.getElementById('edStart'), [1990, date], [1990, date]);
    NouisliderService.create(document.getElementById('edEnd'), [1990, date], [1990, date]);
  }

  nameFilt(value: string): void {
      this.subject.next(value);
  }

  chairFilt(value: string): void {
      this.studentsService.getSpecByChair(value).subscribe( specializations => {
          this.specializations = specializations;
          console.log(this.specializations);
      } );
  }

}
