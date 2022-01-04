import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {StudentData} from "../../interfaces";
import {map} from "rxjs/internal/operators";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<StudentData[]> {
    return this.httpClient.get<StudentData[]>('https://students-base-cd739-default-rtdb.europe-west1.firebasedatabase.app/students.json')
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
}
