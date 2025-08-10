import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HabitsComponent } from './habits.component';
import { HabitService } from '../../services/habit.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Habit } from '../../models/habit.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { HabitCardComponent } from './habit-card/habit-card.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

describe('HabitsComponent', () => {
  let component: HabitsComponent;
  let fixture: ComponentFixture<HabitsComponent>;
  let habitServiceSpy: jasmine.SpyObj<HabitService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockHabits: Habit[] = [
    { id: 1, name: 'Read', icon: '', color: '#4b0082', progress: [], goal: 1, group: 'Health', isActive: true, isExpired: false, startDate: new Date(), endDate: null },
    { id: 2, name: 'Run', icon: '', color: '#4b0082', progress: [], goal: 1, group: 'Fitness', isActive: true, isExpired: false, startDate: new Date(), endDate: null },
  ];

beforeEach(waitForAsync(() => {
  habitServiceSpy = jasmine.createSpyObj('HabitService', [
    'addHabit',
    'updateHabit',
    'deleteHabit',
    'groupHabits',
    'updateHabitStatuses',
    'getHabits',
    'getIconForGroup' 
  ], { habits$: of(mockHabits) });

  habitServiceSpy.groupHabits.and.returnValue({ Health: [mockHabits[0]], Fitness: [mockHabits[1]] });
  habitServiceSpy.getHabits.and.returnValue(mockHabits);
  habitServiceSpy.getIconForGroup.and.callFake((group: string) => 'default-icon');

  dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  TestBed.configureTestingModule({
    declarations: [HabitsComponent, HabitFormComponent, HabitCardComponent, NavbarComponent],
    imports: [
      FormsModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatToolbarModule,
      MatPaginatorModule,
      MatSelectModule,
      MatDatepickerModule,
      MatCardModule,
      MatTooltipModule,
      MatDialogModule,
      MatNativeDateModule
    ],
    providers: [
      { provide: HabitService, useValue: habitServiceSpy },
      { provide: MatDialog, useValue: dialogSpy },
      { provide: Router, useValue: routerSpy },
      { provide: MatDialogRef, useValue: {} },
      { provide: MAT_DIALOG_DATA, useValue: {} }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }).compileComponents();
}));


  beforeEach(() => {
    fixture = TestBed.createComponent(HabitsComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize habits and groupedHabits', () => {
    expect(component.habits.length).toBe(2);
    expect(component.groupedHabits['Health']).toEqual([mockHabits[0]]);
  });

  it('should set editingHabit on edit', () => {
    component.onEditHabit(mockHabits[0]);
    expect(component.editingHabit).toEqual(mockHabits[0]);
  });

  it('should create a new habit when onAddHabit is called', () => {
    component.onAddHabit();
    expect(component.editingHabit).toBeTruthy();
    expect(component.editingHabit?.id).toBe(0);
  });

  it('should add new habit if id is 0', () => {
    const newHabit = { ...mockHabits[0], id: 0 };
    component.habits = [];
    component.onSaveHabit(newHabit);
    expect(habitServiceSpy.addHabit).toHaveBeenCalled();
    expect(component.editingHabit).toBeNull();
  });

  it('should update habit if id is not 0', () => {
    component.onSaveHabit(mockHabits[0]);
    expect(habitServiceSpy.updateHabit).toHaveBeenCalledWith(mockHabits[0]);
  });

  it('should cancel editing', () => {
    component.editingHabit = mockHabits[0];
    component.onCancelEdit();
    expect(component.editingHabit).toBeNull();
  });

  it('should update paged habits based on searchTerm', () => {
    component.searchTerm = 'read';
    component.updatePagedHabits();
    expect(component.pagedHabits.length).toBe(1);
    expect(component.pagedHabits[0].name).toBe('Read');
  });

it('should call deleteHabit on confirm', fakeAsync(() => {
      component.habits = mockHabits; 

  const dialogRefMock = {
    afterClosed: () => of(true)
  };
  dialogSpy.open.and.returnValue(dialogRefMock as any);

  component.habits = mockHabits;  
  component.handleDelete(mockHabits[0]);
  tick();

  expect(dialogSpy.open).toHaveBeenCalled();
  expect(habitServiceSpy.deleteHabit).toHaveBeenCalledWith(mockHabits[0].id);
}));



  it('should not delete if dialog not confirmed', fakeAsync(() => {
    component.habits = mockHabits; 
    const dialogRefMock = {
      afterClosed: () => of(false)
    };
    dialogSpy.open.and.returnValue(dialogRefMock as any);

    component.handleDelete(mockHabits[0]);
    tick();

    expect(habitServiceSpy.deleteHabit).not.toHaveBeenCalled();
  }));
});
