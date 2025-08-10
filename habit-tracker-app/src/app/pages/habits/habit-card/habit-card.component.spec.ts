import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HabitCardComponent } from './habit-card.component';
import { Habit } from '../../../models/habit.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('HabitCardComponent', () => {
  let component: HabitCardComponent;
  let fixture: ComponentFixture<HabitCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HabitCardComponent],
      imports: [MatIconModule, MatTooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitCardComponent);
    component = fixture.componentInstance;

    const fakeHabit: Habit = {
      id: 1,
      name: 'Read a book',
      description: 'Read 10 pages daily',
      icon: 'book',
      color: '#4285F4',
      progress: [],
      goal: 10,
      group: 'Personal Development',
      isActive: true,
      isExpired: false,
      startDate: new Date(),
      endDate: null
    };

    component.habit = fakeHabit;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
