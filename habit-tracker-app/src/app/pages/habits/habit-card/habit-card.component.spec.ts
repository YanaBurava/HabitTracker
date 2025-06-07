import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HabitCardComponent } from './habit-card.component';

describe('HabitCardComponent', () => {
  let component: HabitCardComponent;
  let fixture: ComponentFixture<HabitCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HabitCardComponent]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(HabitCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
