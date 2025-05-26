import { Component, OnInit } from '@angular/core';
import { HabitGroup } from '../../models/habit-group.model';
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
    days: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  weekRange!: string;
   habitGroups: HabitGroup[] = [];


  ngOnInit() {
    const today = new Date();
    this.currentDate = today.toLocaleDateString();
const weekStart = startOfWeek(today, { weekStartsOn: 1 }); 
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 }); 

    const formattedStart = format(weekStart, 'EEE dd MMM');
    const formattedEnd = format(weekEnd, 'EEE dd MMM');  
    this.weekRange = `${formattedStart} – ${formattedEnd}`;


     this.habitGroups.forEach(group => {
    group.habits.forEach(habit => {
      console.log(habit.name, habit.progress, habit.progress.length);
    });
  });

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
