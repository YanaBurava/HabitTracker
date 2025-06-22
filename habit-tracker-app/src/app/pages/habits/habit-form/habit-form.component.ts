import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { Habit } from '../../../models/habit.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HabitFormLabels } from './habit-form-labels.enum';
import { HABIT_ICONS } from '../../../constants/habit-icons.constant';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.scss'],
  standalone: false
})
export class HabitFormComponent implements OnInit, OnDestroy {
  labels = HabitFormLabels;
  iconOptions = HABIT_ICONS;
  destroy$ = new Subject<void>();

  private _habit: Habit | null = null;
  private editableHabit$ = new BehaviorSubject<Habit>(this.getEmptyHabit());
  @Input() habitGroups: string[] = [];

  @Input()
  set habit(value: Habit | null) {
    this._habit = value;
    const habitToEdit = value ? { ...value } : this.getEmptyHabit();
    this.editableHabit$.next(habitToEdit);
    this.form.patchValue(habitToEdit);
  }

  @Output() save = new EventEmitter<Habit>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      icon: [''],
      color: ['#000000'],
      goal: [1, [Validators.required, Validators.min(1)]],
      group: ['General'],
      startDate: [new Date()],
      endDate: [null],
    });
  }

  get habit(): Habit | null {
    return this._habit;
  }

  ngOnInit(): void {

      if (!this._habit) {
    const savedHabit = localStorage.getItem('lastEditedHabit');
    if (savedHabit) {
      try {
        const parsedHabit: Habit = JSON.parse(savedHabit);
        this.habit = parsedHabit;
      } catch (e) {
        console.warn('Invalid habit in localStorage');
      }
    }
  }
  
    this.editableHabit$
      .pipe(takeUntil(this.destroy$))
      .subscribe(habit => {
        this.form.patchValue(habit);
      });
  }

  onSubmit(): void {
    const now = new Date();
    const raw = this.form.getRawValue();

    const updatedHabit: Habit = {
      ...(this._habit ?? { id: 0, progress: [] }),
      ...raw,
      isActive: raw.startDate <= now && (!raw.endDate || raw.endDate >= now),
      isExpired: raw.endDate ? raw.endDate < now : false
    };
     localStorage.setItem('lastEditedHabit', JSON.stringify(updatedHabit));

  
     this.save.emit(updatedHabit);
  }

  onCancel(): void {
    if (!this._habit || JSON.stringify(this._habit) === JSON.stringify(this.form.getRawValue())) {
      this.cancel.emit();
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Discard changes?',
        message: 'You have unsaved changes. Do you want to cancel?'
      }
    })
      .afterClosed()
      .pipe(
        filter(result => result === true),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.cancel.emit());
  }

  shouldShowError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  private getEmptyHabit(): Habit {
    return {
      id: 0,
      name: '',
      description: '',
      icon: '',
      color: '#000000',
      progress: [],
      goal: 1,
      group: 'General',
      isActive: false,
      isExpired: false,
      startDate: new Date(),
      endDate: null
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
