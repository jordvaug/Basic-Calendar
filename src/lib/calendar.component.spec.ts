import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCalendar } from './calendar.component';

describe('CalendarComponent', () => {
  let component: BasicCalendar;
  let fixture: ComponentFixture<BasicCalendar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCalendar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
