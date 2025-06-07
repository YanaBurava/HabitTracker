import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-habit-detail',
  standalone: false,
  templateUrl: './habit-detail.component.html',
  styleUrl: './habit-detail.component.scss'
})
export class HabitDetailComponent {
 habitId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.habitId = +params['id'];
    });
  }
}
