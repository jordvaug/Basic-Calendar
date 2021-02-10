import { NgModule } from '@angular/core';
import { BasicCalendar } from './calendar.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';
import * as Hammer from 'hammerjs';


export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'swipe': { direction: Hammer.DIRECTION_HORIZONTAL },
    'pinch': { enable: false },
    'rotate': { enable: false },
    'pan': { enable: false }
  }
}

@NgModule({
  declarations: [BasicCalendar],
  imports: [
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    HammerModule,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    }
  ],
  exports: [BasicCalendar]
})
export class CalendarModule { }
