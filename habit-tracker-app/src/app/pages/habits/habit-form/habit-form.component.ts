import { Component, Input, Output, EventEmitter,OnChanges, SimpleChanges } from '@angular/core';
import { Habit } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-form',
  templateUrl: './habit-form.component.html',
    standalone: false,
  styleUrls: ['./habit-form.component.scss']
})
export class HabitFormComponent implements OnChanges {
  @Input() habit: Habit | null = null;
  @Output() save = new EventEmitter<Habit>();
  @Output() cancel = new EventEmitter<void>();

  editableHabit: Habit = this.getEmptyHabit();

  ngOnChanges(changes: SimpleChanges) {
    if (this.habit) {
     
      this.editableHabit = { ...this.habit };
    } else {
      this.editableHabit = this.getEmptyHabit();
    }
  }

  private getEmptyHabit(): Habit {
    return {
      id: 0,
      name: '',
      description: '',
      icon: '',
      color: '#ffffff',
      daysOfWeek: [],
      progress: [false, false, false, false, false, false, false],
      goal: 1,
      isActive: true,
      isExpired: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  onSubmit() {
    this.save.emit(this.editableHabit);
  }

  onCancel() {
    this.cancel.emit();
  }
}