import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Habit } from '../../../models/habit.model';

@Component({
  selector: 'app-habit-card',
  standalone: false,
  templateUrl: './habit-card.component.html',
  styleUrl: './habit-card.component.scss'
})
export class HabitCardComponent {
  @Input() habit!: Habit;
  @Output() edit = new EventEmitter<Habit>();
 @Output() delete = new EventEmitter<Habit>();

  onEdit():void {
    this.edit.emit(this.habit);
  }

  onDelete():void  {
    this.delete.emit(this.habit);
  }
}