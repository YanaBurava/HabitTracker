import { Habit } from './habit.model';

export interface HabitGroup {
   id: number,
    name: string,
    totalHabits: number,
    completedHabits: number,
  habits: Habit[];
  type: 'default' | 'language' | 'fitness' | string;
}
