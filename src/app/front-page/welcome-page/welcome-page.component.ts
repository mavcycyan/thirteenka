import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GlobalVarsService} from "../../includes/global-vars.service";
import {interval, Subscription} from "rxjs/index";
import {Chart, registerables } from "chart.js";
import {WelcomePageService} from "./welcome-page.service";
import {StatisticData} from "../../interfaces";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('gstart') gstartRef: ElementRef = new ElementRef('canvas');
  @ViewChild('gend') gendRef: ElementRef = new ElementRef('canvas');

  today: number = Date.now();
  user = this.globalVars.user;

  clock: Subscription;

  constructor(private globalVars: GlobalVarsService,
              private welcomeService: WelcomePageService) {
      const interv$ = interval(1000);
      this.clock = interv$.subscribe( () => {
          this.today = Date.now();
      });
      Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      console.log(1);
      this.chartJs();
  }

  ngOnDestroy(): void {
    this.clock.unsubscribe();
  }

  chartJs(): void {

      this.welcomeService.getStatistic('statistics_start').subscribe( data => {

          const graphStart: any = {
              label: 'Count of students, who started education',
              color: 'rgb(255, 99, 51)',
              fillColor: 'rgba(255, 99, 51, 0.2)'
          }

          const dataArray = Object.values(data).sort( (item1: StatisticData, item2: StatisticData) => item1.year - item2.year );

          graphStart.labels = dataArray.map(item => item.year);
          graphStart.data = dataArray.map(item => item.count);


          const graphStartCtx = this.gstartRef.nativeElement.getContext('2d');
          graphStartCtx.canvas.style.maxHeight = '300px';

          new Chart(graphStartCtx, createChartConfig(graphStart));

      } )
      this.welcomeService.getStatistic('statistics_end').subscribe( data => {

          const graphEnd: any = {
              label: 'Count of students, who successfully finished education',
              color: 'rgb(51, 133, 255)',
              fillColor: 'rgba(51, 133, 255, 0.2)'
          }

          const dataArray = Object.values(data).sort( (item1: StatisticData, item2: StatisticData) => item1.year - item2.year );

          graphEnd.labels = dataArray.map(item => item.year);
          graphEnd.data = dataArray.map(item => item.count);


          const graphEndCtx = this.gendRef.nativeElement.getContext('2d');
          graphEndCtx.canvas.style.maxHeight = '300px';

          new Chart(graphEndCtx, createChartConfig(graphEnd));

      } )


  }

}

function createChartConfig({labels, data, label, color, fillColor}: any): any {
    return {
        type: "line",
        options: {
            responsive: true
        },
        data: {
            labels,
            datasets: [{
                label, data,
                borderColor: color,
                steppedLine: false,
                fill: {
                    target: 'origin',
                    above: fillColor,
                }
            }]
        }
    }
}