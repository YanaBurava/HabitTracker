import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';
import { MOCK_HABIT } from '../mock/mock-habit';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  private readonly STORAGE_KEY = 'habitProgress';
  private readonly HABITS_KEY = 'habitsList';

  constructor() {}

  // --------- HABITS STORAGE ----------
  loadHabits(): Habit[] {
    const raw = localStorage.getItem(this.HABITS_KEY);
    if (raw) {
      return JSON.parse(raw).map((h: any) => ({
        ...h,
        startDate: new Date(h.startDate),
        endDate: h.endDate ? new Date(h.endDate) : null,
      }));
    }
    return [...MOCK_HABIT];
  }

  saveHabits(habits: Habit[]): void {
    localStorage.setItem(this.HABITS_KEY, JSON.stringify(habits));
  }

  addHabit(newHabit: Habit): void {
    const habits = this.loadHabits();
    habits.push(newHabit);
    this.saveHabits(habits);
  }

  updateHabit(updatedHabit: Habit): void {
    const habits = this.loadHabits().map(h =>
      h.id === updatedHabit.id ? updatedHabit : h
    );
    this.saveHabits(habits);
  }

  // --------- PROGRESS STORAGE ----------
  private loadProgress(): Record<number, string[]> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  }

  private saveProgress(progress: Record<number, string[]>): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  getProgressForHabit(habit: Habit): string[] {
    const progressData = this.loadProgress();
    return (progressData[habit.id] ?? []).map(d => this.formatDate(d));
  }

  toggleMarkDay(habit: Habit, dateStr: string): void {
    const progressData = this.loadProgress();
    const progress = progressData[habit.id] ?? [];

    const index = progress.indexOf(dateStr);
    if (index === -1) {
      progress.push(dateStr);
    } else {
      progress.splice(index, 1);
    }

    progressData[habit.id] = progress;
    this.saveProgress(progressData);
  }

  isMarkedDay(habit: Habit, dateStr: string): boolean {
    const progress = this.getProgressForHabit(habit);
    return progress.includes(dateStr);
  }

  formatDate(date: Date | string): string {
    return format(new Date(date), 'yyyy-MM-dd');
  }

  // --------- FULL HABIT PROCESSING ----------
  getHabits(): Habit[] {
    const storedProgress = this.loadProgress();
    const habits = this.loadHabits();

    const habitsWithProgress = habits.map(habit => ({
      ...habit,
      progress: (storedProgress[habit.id] ?? []).map(d => this.formatDate(d)),
    }));

    return this.updateHabitStatuses(habitsWithProgress);
  }

  updateHabitStatuses(habits: Habit[]): Habit[] {
    const now = new Date();
    return habits.map(habit => {
      const hasValidStartDate = habit.startDate instanceof Date && !isNaN(habit.startDate.getTime());
      const hasValidEndDate = habit.endDate instanceof Date && !isNaN(habit.endDate?.getTime() ?? NaN);

      return {
        ...habit,
        isActive: hasValidStartDate && habit.startDate <= now && (!hasValidEndDate || habit.endDate! >= now),
        isExpired: hasValidEndDate && habit.endDate! < now,
      };
    });
  }

  getActiveHabits(): Habit[] {
    return this.getHabits().filter(habit => habit.isActive);
  }

  getHabitById(id: number): Habit | null {
    return this.getHabits().find(habit => habit.id === id) || null;
  }

  getProgressText(habit: Habit): string {
    const doneCount = habit.progress.length;
    return `${doneCount}/${habit.goal}`;
  }

  getProgressPercentage(habit: Habit): number {
    const doneCount = habit.progress.length;
    return Math.min(100, Math.round((doneCount / habit.goal) * 100));
  }

  filterHabitsByWeek(habits: Habit[], weekStart: Date, weekEnd: Date): Habit[] {
    const MAX_DATE = new Date('9999-12-31T23:59:59.999Z');
    return habits.filter(habit => {
      const start = habit.startDate;
      const end = habit.endDate ?? MAX_DATE;
      return start <= weekEnd && end >= weekStart;
    });
  }
}
