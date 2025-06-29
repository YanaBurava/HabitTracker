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

 getGroupProgress(habits: Habit[]): { group: string; percent: number; total: number; }[] {
  const groupMap: Record<string, { total: number; done: number }> = {};

  habits.forEach(habit => {
    if (!groupMap[habit.group]) {
      groupMap[habit.group] = { total: 0, done: 0 };
    }
    groupMap[habit.group].total += habit.goal;
    groupMap[habit.group].done += habit.progress.length;
  });

  return Object.entries(groupMap).map(([group, { total, done }]) => ({
    group,
    percent: Math.min(100, Math.round((done / total) * 100)),
    total
  }));
}

getGroupGoalRatios(progress: { group: string, percent: number, total: number }[]): number[] {
  const max = Math.max(...progress.map(p => p.total));
  return progress.map(p => Math.round((p.total / max) * 100));
}

 prepareRadarChart(): void {
  const groupProgress = this.getGroupProgress(this.habits);
  const goalRatios = this.getGroupGoalRatios(groupProgress);
  this.radarChartLabels = groupProgress.map(g => g.group);

  this.radarChartData = {
    labels: this.radarChartLabels,
    datasets: [
      {
        label: 'Progress',
        data: groupProgress.map(g => g.percent),
        fill: true,
        backgroundColor: 'rgba(34, 202, 236, 0.2)',
        borderColor: 'rgb(102, 123, 180)',
        pointBackgroundColor: 'rgb(132, 145, 185)',
      },
      {
        label: 'Group Goal Weight',
        data: goalRatios,
        fill: false,
        borderColor: 'rgba(137, 197, 160, 0.7)',
        borderDash: [5, 5],
        pointRadius: 0
      }
    ]
  };
}

}
