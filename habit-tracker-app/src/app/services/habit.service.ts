import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';
import { MOCK_HABIT } from '../mock/mock-habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  getHabits(): Habit[] {
    return MOCK_HABIT.map(habit => ({
      ...habit,
      startDate: new Date(habit.startDate),
      endDate: habit.endDate ? new Date(habit.endDate) : null,
    }));
  }

  updateHabitStatuses(habits: Habit[]): Habit[] {
    const now = new Date();
    return habits.map(habit => ({
      ...habit,
      isActive: habit.startDate <= now && (!habit.endDate || habit.endDate >= now),
      isExpired: habit.endDate ? habit.endDate < now : false
    }));
  }

  groupHabits(habits: Habit[]): { [group: string]: Habit[] } {
    return habits.reduce((acc, habit) => {
      const group = habit.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(habit);
      return acc;
    }, {} as { [group: string]: Habit[] });
  }

  getIconForGroup(group: string): string {
    const iconMap: Record<string, string> = {
      General: 'home',
      Fitness: 'fitness_center',
      Reading: 'menu_book',
      Relax: 'spa',
      Food: 'restaurant',
      Study: 'school',
      Sleep: 'bedtime',
    };
    return iconMap[group] || 'category';
  }
}