import { Injectable } from '@angular/core';
import { Habit } from '../models/habit.model';
import { HabitService } from './habit.service'; 
import { MOCK_HABIT } from '../mock/mock-habit';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
private readonly STORAGE_KEY = 'habitProgress';
private readonly HABITS_KEY = 'habitsList';

constructor(private habitService: HabitService) {}

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
    const habits = this.loadHabits().map(h => h.id === updatedHabit.id ? updatedHabit : h);
    this.saveHabits(habits);
  }

  loadStoredProgress(): Record<string, string[]> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  }

    private loadProgress(): Record<number, string[]> {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  }

    formatDate(date: Date | string): string {
    return format(new Date(date), 'yyyy-MM-dd');
  }
mapHabitsWithProgress(storedProgress: Record<string, string[]>): Habit[] {
  const habits = this.loadHabits();

  return habits.map(habit => {
    const habitId = habit.id.toString();
    const progressFromStorage = storedProgress[habitId];

    let progress: string[];

    if (progressFromStorage && progressFromStorage.length > 0) {
      progress = progressFromStorage;
    } else if (habit.progress && habit.progress.length > 0) {
      progress = habit.progress.map(d => this.formatDate(d));
    } else {
      progress = [];
    }

    return {
      ...habit,
      progress
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
 const now = new Date();
    return this.habitService.getHabits().filter(habit =>
      habit.startDate <= now && (!habit.endDate || habit.endDate >= now)
    );
    }

    isMarkedDay(habit: Habit, dateStr: string): boolean {
    const progress = this.getProgressForHabit(habit);
    return progress.includes(dateStr);
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

  const habits = this.loadHabits();
  const updatedHabits = habits.map(h => h.id === habit.id ? habit : h);
  this.saveHabits(updatedHabits);
}

  getProgressText(habit: Habit): string {
  const doneCount = habit.progress.length;
  return `${doneCount}/${habit.goal}`;
}
 getHabitById(id: number): Habit | null {
  const habit = this.getHabits().find(habit => habit.id === id);
  return habit || null;
}

  getProgressPercentage(habit: Habit): number {
    const doneCount = habit.progress.length;
    return Math.min(100, Math.round((doneCount / habit.goal) * 100));
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
