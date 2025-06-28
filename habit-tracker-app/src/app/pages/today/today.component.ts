import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HabitService } from '../../services/today-habit.service';
import { startOfWeek, addDays } from 'date-fns';

@Component({
  selector: 'app-today',
  standalone: false,
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  habits: Habit[] = [];
  daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  daysISO: string[] = [];
  todayDateStr: string = '';
  currentDayIndex: number = 0;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.todayDateStr = this.habitService.formatDate(new Date());
    this.habits = this.habitService.getActiveHabits();

    this.updateDaysISO();

    this.currentDayIndex = this.getCurrentDayIndex();
  }

  updateDaysISO(): void {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  this.daysISO = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i);
    return this.habitService.formatDate(day);
  });
  }

  isMarked(habit: Habit, dayIndex: number): boolean {
    const dateStr = this.daysISO[dayIndex];
    return this.habitService.isMarkedDay(habit, dateStr);
  }

  toggleMark(habit: Habit, dayIndex: number): void {
    const dateStr = this.daysISO[dayIndex];
    this.habitService.toggleMarkDay(habit, dateStr);
  }
  toggleMarkToday(habit: Habit): void {
  this.habitService.toggleMarkDay(habit, this.todayDateStr);
}

isMarkedToday(habit: Habit): boolean {
  return this.habitService.isMarkedDay(habit, this.todayDateStr);
}

getProgressText(habit: Habit): string {
  const doneCount = habit.progress.length;
  return `${doneCount}/${habit.goal}`;
}

hasReachedGoal(habit: Habit): boolean {
  return habit.progress.length >= habit.goal;
}
getCurrentDayIndex(): number {
  const todayISO = this.todayDateStr;
  return this.daysISO.findIndex(day => day === todayISO);
}
}