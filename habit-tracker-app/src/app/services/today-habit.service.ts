import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';
import { MOCK_HABIT } from '../mock/mock-habit';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  private STORAGE_KEY = 'habitProgress';

  loadStoredProgress(): Record<string, string[]> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  }

    formatDate(date: Date | string): string {
    return format(new Date(date), 'yyyy-MM-dd');
  }
  mapHabitsWithProgress(storedProgress: Record<string, string[]>): Habit[] {
    return MOCK_HABIT.map(habit => {
      const habitId = habit.id.toString();
      const progressFromStorage = storedProgress[habitId] || habit.progress;

      return {
        ...habit,
        progress: progressFromStorage.map(d => this.formatDate(d)),
        startDate: new Date(habit.startDate),
        endDate: habit.endDate ? new Date(habit.endDate) : null,
      };
    });
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


   getHabits(): Habit[] {
    const storedProgress = this.loadStoredProgress();
    const habitsWithProgress = this.mapHabitsWithProgress(storedProgress);
    return this.updateHabitStatuses(habitsWithProgress);
  }

  getActiveHabits(): Habit[] {
    return this.getHabits().filter(habit => habit.isActive && !habit.isExpired);
  }

    isMarkedDay(habit: Habit, dateStr: string): boolean {
    const progress = this.getProgressForHabit(habit);
    return progress.includes(dateStr);
  }
  
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
    if (progressData[habit.id]) {
      return progressData[habit.id];
    }
    return habit.progress.map(date => this.formatDate(date));
  }

 toggleMarkDay(habit: Habit, dateStr: string): void {
  const progressData = this.loadProgress();
  const habitProgress = this.getProgressForHabit(habit);

  const index = habitProgress.indexOf(dateStr);
  if (index === -1) {
    habitProgress.push(dateStr);
  } else {
    habitProgress.splice(index, 1);
  }

  progressData[habit.id] = habitProgress;
  this.saveProgress(progressData);

  habit.progress = [...habitProgress];
}

  getProgressText(habit: Habit): string {
  const doneCount = habit.progress.length;
  return `${doneCount}/${habit.goal}`;
}
 getHabitById(id: number): Habit | null {
  const habit = this.getHabits().find(habit => habit.id === id);
  return habit || null;
}
filterHabitsByWeek(habits: Habit[], weekStart: Date, weekEnd: Date): Habit[] {
    const MAX_DATE = new Date('9999-12-31T23:59:59.999Z');
    return habits.filter(habit => {
    const startDate = habit.startDate;
    const endDate = habit.endDate ?? MAX_DATE; 

    return startDate <= weekEnd && endDate >= weekStart;
  });
  
}
}
