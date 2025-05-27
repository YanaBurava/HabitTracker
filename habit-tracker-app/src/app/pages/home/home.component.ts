import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 currentDate!: string;
  weather: any;
  wordOfTheDay: any;
  activeHabits = [
    { name: 'Exercise', completed: true },
    { name: 'Read', completed: false },
    { name: 'Meditate', completed: true }
  ];

  ngOnInit() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();

    // заменить на реальный API
    this.weather = {
      temperature: 22,
      description: 'Sunny'
    };
    this.wordOfTheDay = {
      word: 'Ebullient',
      definition: 'Cheerful and full of energy.'
    };
  }
}
