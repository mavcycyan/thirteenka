import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ChairData, SpecData} from "../../../interfaces";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/internal/operators";

@Injectable({
    providedIn: 'root'
})
export class SpecializationService {

    constructor(private httpClient: HttpClient) { }

    getAllByChair(chairId: string): Observable<SpecData[]> {
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

    getById(id: string): Observable<SpecData> {
        return this.httpClient.get<SpecData>(`${environment.firebaseDB}specializations/${id}.json`);
    }

    add(data: ChairData): Observable<SpecData> {
        return this.httpClient.post<SpecData>(`${environment.firebaseDB}specializations.json`, data);
    }

    update(id: string, data: ChairData): Observable<SpecData> {
        return this.httpClient.patch<SpecData>(`${environment.firebaseDB}specializations/${id}.json`, data);
    }

    delete(id: string): Observable<SpecData> {
        return this.httpClient.delete<SpecData>(`${environment.firebaseDB}specializations/${id}.json`);
    }


}
