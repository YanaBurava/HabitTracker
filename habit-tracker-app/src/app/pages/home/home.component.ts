import { Component, OnInit } from '@angular/core';
import { startOfWeek, endOfWeek, format } from 'date-fns';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
 currentDate!: string;
  weather: any;
  wordOfTheDay: any;

  ngOnInit() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); 
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); 

    // TODO заменить на реальный API
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
