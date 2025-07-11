import { Component, OnInit } from '@angular/core';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from 'date-fns';
import { HabitService } from '../../services/today-habit.service';
import { Habit } from '../../models/habit.model';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDate!: string;
  weather: any;
  wordOfTheDay: any;
  currentWeekStart!: Date;
  currentWeekEnd!: Date;
  weekDates: string[] = [];

  habits: Habit[] = [];

  constructor(private habitService: HabitService) {}

ngOnInit() {
  const today = new Date();
  this.currentDate = today.toLocaleDateString();

  this.weather = {
    temperature: 22,
    description: 'Sunny'
  };

  this.wordOfTheDay = {
    word: 'Ebullient',
    definition: 'Cheerful and full of energy.'
  };

  this.setCurrentDate();
  this.setCurrentWeek(new Date());
  this.loadHabits();
}

   setCurrentDate(): void {
    this.currentDate = format(new Date(), 'yyyy-MM-dd');
  }
  setCurrentWeek(date: Date): void {
    this.currentWeekStart = startOfWeek(date, { weekStartsOn: 1 });
    this.currentWeekEnd = endOfWeek(date, { weekStartsOn: 1 });
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(this.currentWeekStart);
      d.setDate(this.currentWeekStart.getDate() + i);
      this.weekDates.push(this.habitService.formatDate(d));
    }
    this.loadHabits();
  }

  previousWeek(): void {
    const newStart = subWeeks(this.currentWeekStart, 1);
    this.setCurrentWeek(newStart);
  }

  nextWeek(): void {
    const newStart = addWeeks(this.currentWeekStart, 1);
    this.setCurrentWeek(newStart);
  }

  loadHabits(): void {
    const allActiveHabits = this.habitService.getActiveHabits();
    this.habits = this.habitService.filterHabitsByWeek(allActiveHabits, this.currentWeekStart, this.currentWeekEnd);
  }

  isMarked(habit: Habit, dateStr: string): boolean {
    return this.habitService.isMarkedDay(habit, dateStr);
  }

  toggleMark(habit: Habit, dateStr: string): void {
    this.habitService.toggleMarkDay(habit, dateStr);
  }

  getProgress(habit: Habit): number {
    const count = habit.progress.length;
    return Math.min(100, Math.round((count / habit.goal) * 100));
  }
}