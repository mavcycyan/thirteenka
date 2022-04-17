import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";
import {StatisticData} from "../../interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WelcomePageService {


  constructor(private httpClient: HttpClient) { }

  getStatistic(param: string): Observable<StatisticData[]> {
    return this.httpClient.get<StatisticData[]>(`${environment.firebaseDB}${param}.json`);
  }


}
