import { Component, OnInit } from '@angular/core';
import {StudentData} from "../../interfaces";
import {StudentsService} from "./students.service";

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Array<StudentData> = [];

  constructor(private studService: StudentsService) { }

  ngOnInit(): void {
    this.studService.getAll().subscribe((list: StudentData[]) => {
        this.students = list;
    });
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
