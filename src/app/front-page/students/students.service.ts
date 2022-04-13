import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, pipe} from "rxjs/index";
import {ChairData, FilterParam, SpecData, StudentData} from "../../interfaces";
import {map} from "rxjs/internal/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getAll(param: FilterParam = {type: '', value: ''}): Observable<StudentData[]> {
    let paramsObj = {};
    if (param.value) {
        let value: any = param.value;
        if (param.type === 'budget' || param.type === 'scholarship') {
            paramsObj = {
                params:{
                    orderBy: `"${param.type}"`,
                    equalTo: `${param.value}`
                }
            }
        } else {
            paramsObj = {
                params:{
                    orderBy: `"${param.type}"`,
                    equalTo: `"${param.value}"`
                }
            }
        }
    }

    return this.httpClient.get<StudentData[]>(`${environment.firebaseDB}students.json`, paramsObj)
        .pipe(map( (response: {[key: string]: any}) => {
          return Object
              .keys(response)
              .map( key => ({
                  ...response[key],
                  _id: key
              }) );
      } ));
  }
  getById(id: string): Observable<StudentData> {
    return this.httpClient.get<StudentData>(`${environment.firebaseDB}students/${id}.json`);
  }
  add(data: StudentData): Observable<StudentData> {
      return this.httpClient.post<StudentData>(`${environment.firebaseDB}students.json`, data);
  }
  update(id: string, data: StudentData): Observable<StudentData> {
      return this.httpClient.patch<StudentData>(`${environment.firebaseDB}students/${id}.json`, data);
  }
  delete(id: string): Observable<StudentData> {
      return this.httpClient.delete<StudentData>(`${environment.firebaseDB}students/${id}.json`);
  }

  getAllChairs(): Observable<ChairData[]> {
      return this.httpClient.get<ChairData[]>(`${environment.firebaseDB}chairs.json`)
          .pipe( map( (response: {[key: string] : any}) => {
              return Object
                  .keys(response)
                  .map( key => ({
                      ...response[key],
                      _id: key
                  }) );
          } ));
  }

  getAllSpec(): Observable<SpecData[]> {
      return this.httpClient.get<SpecData[]>(`${environment.firebaseDB}specializations.json`)
          .pipe( map( (response: {[key: string] : any}) => {
              return Object
                  .keys(response)
                  .map( key => ({
                      ...response[key],
                      _id: key
                  }) );
          } ));
  }
    getSpecByChair(chairId: string): Observable<SpecData[]> {
        console.log(chairId);
        return this.httpClient.get<SpecData[]>(`${environment.firebaseDB}specializations.json`,
            {
                params: {
                    orderBy: '"chair"',
                    equalTo: `"${chairId}"`,
                },
            }
        )
            .pipe( map( (response: {[key: string] : any}) => {
                return Object
                    .keys(response)
                    .map( key => ({
                        ...response[key],
                        _id: key
                    }) );
            } ));
    }
}
