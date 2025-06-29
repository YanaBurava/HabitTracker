import { Component, OnInit, OnChanges  } from '@angular/core';
import { MOCK_HABIT } from '../../mock/mock-habit';
import { Habit } from '../../models/habit.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  calendarData: { date: string; count: number }[] = [];
  endDate = new Date();

habits: Habit[] = [];
componentsOrder = ['radar', 'settings'];

drop(event: CdkDragDrop<string[]>) {
  moveItemInArray(this.componentsOrder, event.previousIndex, event.currentIndex);
}
  ngOnInit() {
    this.habits = MOCK_HABIT;
    const allDates = this.habits.flatMap(habit => habit.progress);

    const dateCountMap: Record<string, number> = {};
    for (const date of allDates) {
      dateCountMap[date] = (dateCountMap[date] || 0) + 1;
    }

    this.calendarData = Object.entries(dateCountMap).map(([date, count]) => ({
      date,
      count
    }));
  }
}
