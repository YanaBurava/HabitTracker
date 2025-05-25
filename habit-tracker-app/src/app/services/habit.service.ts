import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Habit } from '../models/habit.model';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private readonly storageKey = 'habits';
  private habitsSubject = new BehaviorSubject<Habit[]>(this.loadHabits());

  habits$ = this.habitsSubject.asObservable();

  private loadHabits(): Habit[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  private saveHabits(habits: Habit[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(habits));
    this.habitsSubject.next(habits);
  }

  getAllHabits(): Habit[] {
    return this.habitsSubject.value;
  }

  getHabitById(id: number): Habit | undefined {
    return this.getAllHabits().find(h => h.id === id);
  }

  addHabit(habit: Habit): void {
    const habits = this.getAllHabits();
    this.saveHabits([...habits, habit]);
  }

  updateHabit(updatedHabit: Habit): void {
    const habits = this.getAllHabits().map(h => (h.id === updatedHabit.id ? updatedHabit : h));
    this.saveHabits(habits);
  }

  deleteHabit(id: number): void {
    const habits = this.getAllHabits().filter(h => h.id !== id);
    this.saveHabits(habits);
  }
}
