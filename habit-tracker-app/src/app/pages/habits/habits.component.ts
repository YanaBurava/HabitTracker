import { Component } from '@angular/core';

@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})
export class HabitsComponent {
habits = [
    { id: 1, name: 'Drink Water', status: 'active' },
    { id: 2, name: 'Exercise', status: 'inactive' },
    { id: 3, name: 'Read Books', status: 'active' }
  ];
}
