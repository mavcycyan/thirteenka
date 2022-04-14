import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ChairData, SpecData, StudentData} from "../../../interfaces";
import {StudentsService} from "../students.service";
import {Subscription} from "rxjs/index";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/internal/operators";
import {MaterializeService} from "../../../includes/materialize.service";

@Component({
  selector: 'app-single-student',
  templateUrl: './single-student.component.html',
  styleUrls: ['./single-student.component.css']
})


export class SingleStudentComponent implements OnInit, OnDestroy {

    errors: string = '';

    edYears: number[] = [];

    studId: string = '';
    studSub$: Subscription = new Subscription();

    addUpdTxt: string = 'add';
    isUpd: boolean = false;

    chairList: ChairData[] = [];
    specList: SpecData[] = [];

    studForm: FormGroup = new FormGroup({
        surname: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        patronymic: new FormControl('', Validators.required),
        birthday: new FormControl(''),
        citizenship: new FormControl(''),
        nativeCity: new FormControl(''),
        address: new FormControl(''),
        schoolFinished: new FormControl(''),
        chair: new FormControl(''),
        speciality: new FormControl(''),
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
        const edStart = 1980;
        const edEnd = new Date().getFullYear();

        for (let i = 0; i <= edEnd - edStart; i++) {
            this.edYears[i] = edStart + i;
        }

        this.studSub$ = this.route.params.pipe<StudentData>(
            switchMap( (params: Params) => {
                this.studId = params['id'];
                return this.studService.getById(params['id'])
            } )
        ).subscribe((stData: StudentData) => {
            if (stData) {
                this.studService.getAllChairs()
                    .pipe<ChairData[]>(
                        switchMap( (chairs: ChairData[]) => {
                            this.chairList = chairs;
                            return this.studService.getSpecByChair(stData.chair);
                        })
                    ).subscribe( (response: SpecData[]) => {
                        this.specList = response;

                        this.studForm.patchValue({
                            surname: stData.surname,
                            firstName: stData.firstName,
                            patronymic:  stData.patronymic,
                            birthday: stData.birthday,
                            citizenship: stData.citizenship,
                            nativeCity:  stData.nativeCity,
                            address: stData.address,
                            schoolFinished: stData.schoolFinished,
                            chair: stData.chair,
                            speciality: stData.speciality,
                            group: stData.group,
                            educForm: stData.educForm,
                            curator: stData.curator,
                            degree: stData.degree,
                            yearStart: stData.yearStart,
                            yearEnd: stData.yearEnd,
                            status: stData.status,
                            budget: stData.budget,
                            scholarship: stData.scholarship
                        });
                        this.addUpdTxt = 'update';
                        this.isUpd = true;

                    } )
            }
        })

        if (this.studId === '' || this.studId === undefined) {
            this.studService.getAllChairs().subscribe( (chairs: ChairData[]) => {
                this.chairList = chairs;
            });
        }


    }

    onSubmit() {
        if (this.studForm.status !== 'INVALID') {
            const data = this.studForm.value;
            if (this.studId === '' || this.studId === undefined) {
                this.studService.add(data).subscribe(
                    response => {
                        this.router.navigate(['students'])
                    },
                    error => {
                        this.errors = error.error.error;
                        console.log(error);
                    },
                )
            } else {
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
            }
        } else {
            MaterializeService.toast('Fill all required fields!', 'red')
        }
    }

    showModal(el: any): void {
        const modal = MaterializeService.modal(el);
        modal.open();
    }
    removeStudent(id: string): void {
        this.studService.delete(id).subscribe(
            response => {
                this.router.navigate(['students'])
                MaterializeService.toast(`Student removed.`);
            },
            error => {
                MaterializeService.toast(`Some error occurred!`);
                console.log(error.error.error);
            }
        )
    }

    changeChair(e: any) {
        this.studForm.patchValue({
            chair: e.target.value
        })
        this.studService.getSpecByChair(e.target.value).subscribe( (response: SpecData[]) => {
            this.specList = response;
        } )
    }

    changeSpec(e: any) {
        this.studForm.patchValue({
            speciality: e.target.value
        })
    }

    ngOnDestroy(): void {
        this.studSub$.unsubscribe();
    }



}
