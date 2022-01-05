import { Component, OnInit } from '@angular/core';
import {StudentData} from "../../interfaces";
import {StudentsService} from "./students.service";
import {MaterializeService} from "../../includes/materialize.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Array<StudentData> = [];
  studForRemove: string = '';

  constructor(private studService: StudentsService) { }

  ngOnInit(): void {
    this.studService.getAll().subscribe((list: StudentData[]) => {
        this.students = list;
    });
  }

  showModal(id: string, el: any): void {
      console.log(1);
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

}
