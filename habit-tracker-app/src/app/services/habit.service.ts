import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Habit } from '../models/habit.model';
import { MOCK_HABIT } from '../mock/mock-habit';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private habitsSubject = new BehaviorSubject<Habit[]>([]);
  habits$: Observable<Habit[]> = this.habitsSubject.asObservable();

  constructor() {
    const parsedHabits = MOCK_HABIT.map(habit => ({
      ...habit,
      startDate: new Date(habit.startDate),
      endDate: habit.endDate ? new Date(habit.endDate) : null,
    }));
    this.setHabits(parsedHabits);
  }

  private setHabits(habits: Habit[]): void {
    const updated = this.updateHabitStatuses(habits);
    this.habitsSubject.next(updated);
  }

  updateHabitStatuses(habits: Habit[]): Habit[] {
    const now = new Date();
    return habits.map(habit => ({
      ...habit,
      isActive: habit.startDate <= now && (!habit.endDate || habit.endDate >= now),
      isExpired: habit.endDate ? habit.endDate < now : false
    }));
  }

  getHabits(): Habit[] {
    return this.habitsSubject.getValue();
  }

  groupHabits(habits: Habit[]): { [group: string]: Habit[] } {
    return habits.reduce((acc, habit) => {
      const group = habit.group || 'Other';
      if (!acc[group]) acc[group] = [];
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

  addHabit(habit: Habit) {
    const updatedHabits = [...this.getHabits(), habit];
    this.setHabits(updatedHabits);
  }

  updateHabit(updatedHabit: Habit) {
    const updatedHabits = this.getHabits().map(habit =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    this.setHabits(updatedHabits);
  }

  deleteHabit(habitId: number) {
    const updatedHabits = this.getHabits().filter(h => h.id !== habitId);
    this.setHabits(updatedHabits);
  }

 getHabitById(id: number): Habit | null {
  const habit = this.getHabits().find(h => h.id === id);
  return habit || null;
}
}
