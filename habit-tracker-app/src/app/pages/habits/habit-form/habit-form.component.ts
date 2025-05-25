import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Habit } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.scss'],
  standalone: false
})
export class HabitFormComponent {
  private _habit: Habit | null = null;

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
      endDate: undefined
    };
  }

  onSubmit() {
    const now = new Date();
    this.editableHabit.isActive = this.editableHabit.startDate <= now &&
      (!this.editableHabit.endDate || this.editableHabit.endDate >= now);

    this.editableHabit.isExpired = this.editableHabit.endDate
      ? this.editableHabit.endDate < now
      : false;

    this.save.emit(this.editableHabit);
  }

  onCancel() {
    this.cancel.emit();
  }
}
