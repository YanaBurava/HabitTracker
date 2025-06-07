import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HabitFormComponent } from './habit-form.component';

describe('HabitFormComponent', () => {
  let component: HabitFormComponent;
  let fixture: ComponentFixture<HabitFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HabitFormComponent]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(HabitFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
