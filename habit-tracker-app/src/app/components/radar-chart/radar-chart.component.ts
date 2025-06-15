import { Component, Input, OnChanges } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { Habit } from '../../models/habit.model';

@Component({
  selector: 'app-radar-chart',
  standalone: false,
  templateUrl: './radar-chart.component.html',
  styleUrl: './radar-chart.component.scss'
})
export class RadarChartComponent implements OnChanges {
  @Input() habits: Habit[] = [];

  radarChartData!: ChartData<'radar'>;
  radarChartLabels: string[] = [];

  radarChartOptions: ChartOptions<'radar'> = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          backdropColor: 'transparent'
        }
      }
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  ngOnChanges() {
    if (this.habits.length > 0) {
      this.prepareRadarChart();
    }
  }

  getGroupProgress(habits: Habit[]): { group: string, percent: number }[] {
    const groupMap: Record<string, { total: number, done: number }> = {};

    habits.forEach(habit => {
      if (!groupMap[habit.group]) {
        groupMap[habit.group] = { total: 0, done: 0 };
      }
      groupMap[habit.group].total += habit.goal;
      groupMap[habit.group].done += habit.progress.length;
    });

    return Object.entries(groupMap).map(([group, { total, done }]) => ({
      group,
      percent: Math.min(100, Math.round((done / total) * 100))
    }));
  }

  prepareRadarChart(): void {
    const groupProgress = this.getGroupProgress(this.habits);
    this.radarChartLabels = groupProgress.map(g => g.group);
    this.radarChartData = {
      labels: this.radarChartLabels,
      datasets: [
        {
          label: 'Group Progress',
          data: groupProgress.map(g => g.percent),
          fill: true,
          backgroundColor: 'rgba(34, 202, 236, .2)',
          borderColor: 'rgba(34, 202, 236, 1)',
          pointBackgroundColor: 'rgba(34, 202, 236, 1)',
        }
      ]
    };
  }
}
