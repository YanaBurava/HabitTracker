import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/habit.model';
import { HabitsService } from '../../services/today-habit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit {
  achievedHabits: Habit[] = [];

  constructor(private habitsService: HabitsService, private router: Router) {}

  ngOnInit(): void {
    const allHabits = this.habitsService.getHabits();
    this.achievedHabits = allHabits.filter(
      habit => habit.progress.length >= habit.goal
    );
  }

  goToHabitDetail(habit: Habit) {
    this.router.navigate(['/habit', habit.id]);
  }
}