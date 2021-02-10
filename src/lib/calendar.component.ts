import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { delay } from 'rxjs/operators';
import { trigger, transition, query, style, animate} from '@angular/animations';

const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(':enter',
      [style({ opacity: 1 }), animate('.1s', style({ opacity: 0, transform: 'translateX(-75px)' }))],
      { optional: true }
    ),
    query(':leave',
    animate( '.05s', style({ opacity: 1, transform: 'translateX(75px)' })),
      { optional: true }
    )
  ])
]);
@Component({
  selector: 'basic-calendar',
  template: `
  <mat-card style="width: 100%;align-content: center;margin-left: auto; margin-right: auto;
  color: whitesmoke; background-color: rgba(0, 0, 0, 0.5);box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  margin-top: 5%;">
  <div class="container">
      <mat-card-title style="color: rgb(255, 201, 71);float:left;">{{title}}</mat-card-title>
      <img *ngIf="iconPath !== ''" style="float: right;width: 15%; height: 75%" src="{{iconPath}}"/>
  </div>
  <mat-card-content> 
      <br />
      <br />
      <br />
      <mat-grid-list cols="3" rowHeight="50px">
          <mat-grid-tile>
              <div style="vertical-align: bottom; right:0px;display:flex;flex-direction:column;cursor: pointer;font-size: 16pt;" class="link" (click)="leftMonth()"><</div>
          </mat-grid-tile>
          <mat-grid-tile>
              <h3 style="display:flex;flex-direction:column;">{{currMonth}} {{year}}</h3> 
          </mat-grid-tile>
          <mat-grid-tile>
              <div style="vertical-align: bottom; left: 0px !important;display:flex;flex-direction:column;cursor: pointer;font-size: 16pt;" class="link" (click)="rightMonth()">></div>
          </mat-grid-tile>
      </mat-grid-list>

      <mat-grid-list cols = "7" rowHeight = "75px">
          <mat-grid-tile>S</mat-grid-tile>
          <mat-grid-tile>M</mat-grid-tile>
          <mat-grid-tile>T</mat-grid-tile>
          <mat-grid-tile>W</mat-grid-tile>
          <mat-grid-tile>T</mat-grid-tile>
          <mat-grid-tile>F</mat-grid-tile>
          <mat-grid-tile>S</mat-grid-tile>
          <div [@listAnimation]="month">
              <mat-grid-tile style="border: solid 1px #000;background-color: whitesmoke;color: black;"
              *ngFor="let in of counter(grids);let i = index"
              (swipeleft)="swipe($event.type)" (swiperight)="swipe($event.type)">
                  <div style="position: absolute;left: 0px !important;
                  top: 0px !important;display: block !important;
                  background-color: whitesmoke;color: black;" *ngIf="i < firstDay; else regdays"></div>
                  <ng-template #regdays>
                      <div style="background-color: rgb(40, 40, 128);color: whitesmoke;
                      position: absolute;left: 0px;top: 0px;" *ngIf="i-firstDay+1 === currDay">{{i-firstDay+1}}</div>
                      <div style="position: absolute;left: 0px !important;
                      top: 0px !important;display: block !important;
                      background-color: whitesmoke;color: black;" *ngIf="i-firstDay+1 !== currDay">{{i-firstDay+1}}</div>
                  </ng-template>
                  <div *ngIf=" eventDays !== undefined && i-firstDay > 0 && eventDays[i-firstDay]">
                      <mat-icon class="icons link" aria-hidden="false" onmouseover="" (click)="selectedDay(i-firstDay+1)">event</mat-icon>
                  </div>
              </mat-grid-tile>
          </div>
      </mat-grid-list>
  </mat-card-content>
</mat-card>
  `,
  animations: [listAnimation],
  styles: ['./calendar.component.css']
})
export class BasicCalendar implements OnInit {

  @Input() events: any = [];
  //Top left title of the calendar
  @Input() title;
  //Optional icon to be used in the top right
  @Input() iconPath = '';
  @Output() result = new EventEmitter<any[]>();
  eventDays
  Feb = 28
  year = new Date().getFullYear()
  month = new Date().getMonth()
  monthNow = new Date().getMonth()
  days
  grids
  currMonth;
  date = new Date()
  isCurrYear
  curryear
  currDay = new Date().getDate()
  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay()
  counter(i: number) {
    return new Array(i);
  }

  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

  constructor() { }

  ngOnInit() {
    //Check if this year is a leap year
    if ((this.year % 1000)% 4 == 0 ){
      this.Feb = 29;
    }
    this.curryear = new Date().getFullYear();
    this.isCurrYear = (this.year === this.curryear);

    this.setMonth();

    this.setDays();

    this.eventsThisMonth();
  }

  //sets events for the currently selected month and year
  eventsThisMonth(){
    this.eventDays = new Array(this.days);

    for (let i = 0; i<this.days; i++){
      for (let j = 0; j<this.events.length; j++) {

        let dateObj = this.events[j].scheduled_Date.split('-');
        let scheduled_Day = parseInt(dateObj[2], 10);
        let scheduled_Year = parseInt(dateObj[0], 10);

        //check for month and only use currMonth trips
        if(this.month === parseInt(dateObj[1], 10)-1 && this.year === scheduled_Year){
          if(scheduled_Day-1 === i ){
            this.eventDays[i] = true;
          }
        }
        if(this.eventDays[i] !== true){
          this.eventDays[i] = false;
        }

        }
    }
  }

  leftMonth(){
    this.month--;

    if(this.month < 0){
      this.month = 11;
      this.year--;
    }
    this.setMonth();
    this.setDays();
    this.eventsThisMonth();

    this.isCurrYear = (this.year === this.curryear);

    if(this.month !== this.monthNow || this.year !== this.curryear){
      this.currDay = -1;
    }
    else {
      this.currDay = new Date().getDate();
    }
  }

  rightMonth(){
    this.month++;

    if(this.month > 11){
      this.month = 0;
      this.year++;
    }
    this.setMonth();
    this.setDays();
    this.eventsThisMonth();

    this.isCurrYear = (this.year === this.curryear);

    if(this.month !== this.monthNow || this.year !== this.curryear){
      this.currDay = -1;
    }
    else {
      this.currDay = new Date().getDate();
    }
  }


  setMonth(){
    switch (this.month) {
      case 0: 
        this.days = 31;
        this.currMonth = 'January'
        break;
      case 1:
        this.days = this.Feb;
        this.currMonth = 'February'
        break;
      case 2:
        this.days = 31;
        this.currMonth = 'March'
        break;
      case 3:
        this.days = 30;
        this.currMonth = 'April';
        break;
      case 4:
        this.days = 31;
        this.currMonth = 'May';
        break;
      case 5:
        this.days = 30;
        this.currMonth = 'June';
        break;
      case 6:
        this.days = 31;
        this.currMonth = 'July';
        break;
      case 7:
        this.days = 31;
        this.currMonth = 'August';
        break;
      case 8:
        this.days = 30;
        this.currMonth = 'September';
        break;
      case 9:
        this.days = 31;
        this.currMonth = 'October';
        break;
      case 10:
        this.days = 30;
        this.currMonth = 'November';
        break;
      case 11:
        this.days = 31;
        this.currMonth = 'December';
    }
    this.firstDay = new Date(this.year, this.month, 1).getDay();
  }

  setDays(){
    //this accounts for the first day of the month not being a Sunday
    this.grids = this.days + this.firstDay; 
  }

//used to set trips from a specific day
  selectedDay(x) {
    let vals = new Array();
    for(let i=0; i<this.events.length; i++){
      let dateObj = this.events[i].scheduled_Date.split('-');
      let date = parseInt(dateObj[2], 10);

      if(date === x) {
        vals.push(this.events[i].id)
      }
    }

    if(vals.length > 0){
      this.result.emit(vals);
    }
      
  }

  swipe(action = this.SWIPE_ACTION.RIGHT) {
    let box = document.getElementById('calendar-box')
    if (action === this.SWIPE_ACTION.RIGHT) {
      this.leftMonth();
    }

    if (action === this.SWIPE_ACTION.LEFT) {
      box.classList.add('slideAnim');  
      delay(1000);
      this.rightMonth();
    }
}

}
