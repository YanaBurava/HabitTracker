import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HabitService } from '../../services/today-habit.service';

@Component({
  selector: 'app-today',
  standalone: false,
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  habits: Habit[] = [];
  daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
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
    const dayOfWeek = today.getDay(); 
  
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    this.daysISO = this.daysOfWeek.map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + mondayOffset + i);
      return this.habitService.formatDate(d);
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
  return this.daysISO.findIndex(d => d === todayISO);
}

}