import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitsService } from '../../services/today-habit.service';
import { Habit } from '../../models/habit.model';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  format,
} from 'date-fns';
import { CircularProgressComponent } from '../circular-progress/circular-progress/circular-progress.component';

@Component({
  selector: 'app-habit-detail',
  standalone: false,
  templateUrl: './habit-detail.component.html',
  styleUrl: './habit-detail.component.scss',
})
export class HabitDetailComponent implements OnInit {
  habit: Habit | null = null;
  currentMonth = new Date();
  daysInMonth: Date[] = [];
  constructor(
    private route: ActivatedRoute,
    private habitService: HabitsService
  ) {}
daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

daysISO: string[] = [];
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.habit = this.habitService.getHabitById(id);
    }
    this.generateMonthDays();
    }


generateMonthDays(): void {
    const start = startOfMonth(this.currentMonth);
    const end = endOfMonth(this.currentMonth);
    this.daysInMonth = eachDayOfInterval({ start, end });
  }

  previousMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, -1);
    this.generateMonthDays();
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.generateMonthDays();
  }

  isMarked(day: Date): boolean {
    if (!this.habit) return false;
    const dateStr = this.habitService.formatDate(day); 
    return this.habitService.isMarkedDay(this.habit, dateStr);
  }

  getMonthLabel(): string {
    return format(this.currentMonth, 'MMMM yyyy'); 
  }
getProgress(habit: Habit): number {
  if (!habit.progress || habit.progress.length === 0) {
    return 0;
  }
  const doneCount = habit.progress.length; 
  return Math.min(100, Math.round((doneCount / habit.goal) * 100));
}
}

