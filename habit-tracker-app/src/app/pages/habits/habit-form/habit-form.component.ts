import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
export class HabitFormComponent {
  labels = HabitFormLabels;
  iconOptions = HABIT_ICONS;

  constructor(private dialog: MatDialog) {}

  private _habit: Habit | null = null;

  @Input() habitGroups: string[] = [];

  @Input()
  set habit(value: Habit | null) {
    this._habit = value;
    this.editableHabit = value ? { ...value } : this.getEmptyHabit();
  }

  get habit(): Habit | null {
    return this._habit;
  }

  @Output() save = new EventEmitter<Habit>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('habitForm') habitForm!: NgForm; 
  editableHabit: Habit = this.getEmptyHabit();

  private getEmptyHabit(): Habit {
    return {
      id: 0,
      name: '',
      description: '',
      icon: '',
      color: '#000000',
      progress: [false, false, false, false, false, false, false],
      goal: 1,
      group: 'General',
      isActive: false,
      isExpired: false,
      startDate: new Date(),
      endDate: null
    };
  }

  onSubmit():void  {
    const now = new Date();
    this.editableHabit.isActive = this.editableHabit.startDate <= now &&
      (!this.editableHabit.endDate || this.editableHabit.endDate >= now);

    this.editableHabit.isExpired = this.editableHabit.endDate
      ? this.editableHabit.endDate < now
      : false;

    this.save.emit(this.editableHabit);
  }

  onCancel():void  {
  if (!this._habit || JSON.stringify(this._habit) === JSON.stringify(this.editableHabit)) {
    this.cancel.emit();
    return;
  }

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '400px',
    data: {
      title: 'Discard changes?',
      message: 'You have unsaved changes. Do you want to cancel?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.cancel.emit();
    }
  });
}
}