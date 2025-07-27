import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitsService } from '../../services/today-habit.service';
import { Habit } from '../../models/habit.model';

import {
  startOfYear,
  endOfYear,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval as eachDayOfIntervalMonth,
  addMonths,
  format,
} from 'date-fns';

@Component({
  selector: 'app-habit-detail',
  templateUrl: './habit-detail.component.html',
  styleUrl: './habit-detail.component.scss',
    standalone: false,

})
export class HabitDetailComponent implements OnInit {
  habit: Habit | null = null;
  currentMonth = new Date();
  currentYear = new Date().getFullYear();
  daysInMonth: Date[] = [];
  daysInYear: Date[] = [];

  constructor(
    private route: ActivatedRoute,
    private habitService: HabitsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.habit = this.habitService.getHabitById(id);
    }
    this.generateMonthDays();
    this.generateYearDays();
  }

  generateMonthDays(): void {
    const start = startOfMonth(this.currentMonth);
    const end = endOfMonth(this.currentMonth);
    this.daysInMonth = eachDayOfInterval({ start, end });
  }

generateYearDays(): void {
  const start = startOfYear(new Date(this.currentYear, 0, 1));
  const end = endOfYear(new Date(this.currentYear, 0, 1));
  this.daysInYear = eachDayOfInterval({ start, end });
}

  previousMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, -1);
    this.generateMonthDays();
    this.generateYearDays();
  }

  nextMonth(): void {
    this.currentMonth = addMonths(this.currentMonth, 1);
    this.generateMonthDays();
    this.generateYearDays();
  }

  isMarked(day: Date): boolean {
    if (!this.habit) return false;
    const dateStr = this.habitService.formatDate(day);
    return this.habitService.isMarkedDay(this.habit, dateStr);
  }

  getMonthLabel(): string {
    return format(this.currentMonth, 'MMMM yyyy');
  }

  getYearLabel(): string {
    return format(this.currentMonth, 'yyyy');
  }

  getProgress(habit: Habit): number {
    if (!habit.progress || habit.progress.length === 0) {
      return 0;
    }
    const doneCount = habit.progress.length;
    return Math.min(100, Math.round((doneCount / habit.goal) * 100));
  }

previousYear(): void {
  this.currentYear -= 1;
  this.currentMonth = new Date(this.currentYear, this.currentMonth.getMonth(), 1);
  this.generateYearDays();
  this.generateMonthDays();
}

nextYear(): void {
  this.currentYear += 1;
  this.currentMonth = new Date(this.currentYear, this.currentMonth.getMonth(), 1);
  this.generateYearDays();
  this.generateMonthDays();
}
}
