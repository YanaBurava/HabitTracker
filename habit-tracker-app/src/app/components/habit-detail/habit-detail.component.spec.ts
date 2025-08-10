import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HabitDetailComponent } from './habit-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('HabitDetailComponent', () => {
  let component: HabitDetailComponent;
  let fixture: ComponentFixture<HabitDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HabitDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              paramMap: {
                get: (key: string) => '123',
              },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
