import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {StudentData} from "../../../interfaces";
import {StudentsService} from "../students.service";
import {Subscription} from "rxjs/index";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})


export class SingleStudentComponent implements OnInit, OnDestroy {

    errors: string = '';

    studId: string = '';
    studSub: Subscription = new Subscription();

    studForm: FormGroup = new FormGroup({
        surname: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        patronymic: new FormControl('', Validators.required),
        birthday: new FormControl('', Validators.required),
        citizenship: new FormControl(''),
        nativeCity: new FormControl(''),
        address: new FormControl(''),
        schoolFinished: new FormControl(''),
        chair: new FormControl(''),
        faculty: new FormControl(''),
        group: new FormControl(''),
        educForm: new FormControl(''),
        curator: new FormControl(''),
        degree: new FormControl(''),
        yearStart: new FormControl(''),
        yearEnd: new FormControl(''),
        status: new FormControl(''),
        budget: new FormControl(''),
        scholarship: new FormControl('')
    });

    constructor(private route: ActivatedRoute,
                private studService: StudentsService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.studSub = this.route.params.pipe<StudentData>(
            switchMap( (params: Params) => {
                this.studId = params['id'];
                return this.studService.getById(params['id'])
            } )
        ).subscribe((stData: StudentData) => {
            if (stData) {
                this.studForm = new FormGroup({
                    surname: new FormControl(stData.surname, Validators.required),
                    firstName: new FormControl(stData.firstName, Validators.required),
                    patronymic: new FormControl(stData.patronymic, Validators.required),
                    birthday: new FormControl(stData.birthday, Validators.required),
                    citizenship: new FormControl(stData.citizenship),
                    nativeCity: new FormControl(stData.nativeCity),
                    address: new FormControl(stData.address),
                    schoolFinished: new FormControl(stData.schoolFinished),
                    chair: new FormControl(stData.chair),
                    faculty: new FormControl(stData.faculty),
                    group: new FormControl(stData.group),
                    educForm: new FormControl(stData.educForm),
                    curator: new FormControl(stData.curator),
                    degree: new FormControl(stData.degree),
                    yearStart: new FormControl(stData.yearStart),
                    yearEnd: new FormControl(stData.yearEnd),
                    status: new FormControl(stData.status),
                    budget: new FormControl(stData.budget),
                    scholarship: new FormControl(stData.scholarship)
                });
            }
        })
    }

    onSubmit() {
        if (this.studForm.status !== 'INVALID') {
            const data = this.studForm.value;
            if (this.studId !== '') {
                const id = this.studId;
                this.studService.update(id, data).subscribe(
                response => {
                        this.router.navigate(['students'])
                    },
                error => {
                        this.errors = error.error.error;
                        console.log(error);
                    },
                )
            } else {
                this.studService.add(data).subscribe(
                    response => {
                        this.router.navigate(['students'])
                    },
                    error => {
                        this.errors = error.error.error;
                        console.log(error);
                    },
                )
            }
        }
    }

    ngOnDestroy(): void {
        this.studSub.unsubscribe();
    }

}
