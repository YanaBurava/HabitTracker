import { Pipe, PipeTransform } from '@angular/core';
import { Habit } from '../models/habit.model';
@Pipe({
  name: 'habitGroup',
  standalone: false
})
export class HabitGroupPipe implements PipeTransform {
  transform(habits: Habit[]): string[] {
    const groups = habits.map(h => h.group).filter(Boolean);
    return Array.from(new Set(groups));
  }
}

