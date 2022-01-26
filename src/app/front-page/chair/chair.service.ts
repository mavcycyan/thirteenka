import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ChairData, SpecData} from "../../interfaces";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ChairService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ChairData[]> {
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

  getById(id: string): Observable<ChairData> {
    return this.httpClient.get<ChairData>(`${environment.firebaseDB}chairs/${id}.json`);
  }

  add(data: ChairData): Observable<ChairData> {
    return this.httpClient.post<ChairData>(`${environment.firebaseDB}chairs.json`, data);
  }

  update(id: string, data: ChairData): Observable<ChairData> {
    return this.httpClient.patch<ChairData>(`${environment.firebaseDB}chairs/${id}.json`, data);
  }

  delete(id: string): Observable<ChairData> {
    return this.httpClient.delete<ChairData>(`${environment.firebaseDB}chairs/${id}.json`);
  }

}
