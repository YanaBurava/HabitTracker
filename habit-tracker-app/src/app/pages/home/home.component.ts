import { Component, OnInit } from '@angular/core';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format } from 'date-fns';
import { HabitsService } from '../../services/today-habit.service';
import { Habit } from '../../models/habit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  today: Date = new Date(); 
  currentDate!: string;
  weather: any;
  wordOfTheDay: any;
  currentWeekStart!: Date;
  currentWeekEnd!: Date;
  weekDates: string[] = [];

  habits: Habit[] = [];

  constructor(private habitService: HabitsService, private router: Router) {}

ngOnInit() {
  const today = new Date();
  this.currentDate = today.toLocaleDateString();

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
   return this.habitService.getProgressPercentage(habit);
  }

   goToHabitDetail(habit: Habit) {
  this.router.navigate(['/habit', habit.id]);
   }
}