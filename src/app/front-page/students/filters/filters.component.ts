import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs/index";
import {debounceTime, switchMap} from "rxjs/internal/operators";
import {StudentsService} from "../students.service";
import {ChairData, SpecData} from "../../../interfaces";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit  {

  private subject: Subject<string> = new Subject();

  edYears: number[] = [];

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
    const edStart = 1980;
    const edEnd = new Date().getFullYear();

    for (let i = 0; i <= edEnd - edStart; i++) {
        this.edYears[i] = edStart + i;
    }

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
