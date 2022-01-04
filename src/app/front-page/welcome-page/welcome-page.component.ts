import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalVarsService} from "../../global-vars.service";
import {interval, Subscription} from "rxjs/index";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit, OnDestroy {

  today: number = Date.now();
  user = this.globalVars.user;

  clock: Subscription;

  constructor(private globalVars: GlobalVarsService) {
      const interv$ = interval(1000);
      this.clock = interv$.subscribe( () => {
          this.today = Date.now();
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.clock.unsubscribe();
  }

}
