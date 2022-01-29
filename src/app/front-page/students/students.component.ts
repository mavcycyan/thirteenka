import {Component, OnDestroy, OnInit} from '@angular/core';
import {StudentData} from "../../interfaces";
import {StudentsService} from "./students.service";
import {MaterializeService} from "../../includes/materialize.service";
import {forkJoin, Subscription} from "rxjs/index";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, OnDestroy {

  students: Array<StudentData> = [];
  studForRemove: string = '';

  studSub$: Subscription = new Subscription();

  constructor(private studService: StudentsService) { }

  ngOnInit(): void {
    this.studSub$ = this.studService.getAll().subscribe((list: StudentData[]) => {
        forkJoin([
            this.studService.getAllChairs(),
            this.studService.getAllSpec()
        ]).subscribe( result => {

            this.students = list.map( (el: StudentData) => {

                const chairEl = result[0].filter( ch => ch._id === el.chair );
                if (chairEl.length > 0 && chairEl[0].name !== 'undefined') {
                    el.chair = chairEl[0].name;
                }

                const specEl = result[1].filter( sp => sp._id === el.speciality );

                if (specEl.length > 0 && specEl[0].name !== 'undefined') {
                    el.speciality = specEl[0].name;
                }

                return el;
            } );
        } )
    });
  }

  showModal(id: string, el: any): void {
      this.studForRemove = id;
      const modal = MaterializeService.modal(el);
      modal.open();
  }
  removeStudent(id: string): void {
    this.studService.delete(id).subscribe(
        response => {
            this.students = this.students.filter( std => std._id !== id );
        },
        error => {
            console.log(error.error.error);
        }
    )
  }

  ngOnDestroy(): void {
      this.studSub$.unsubscribe();
  }

}
