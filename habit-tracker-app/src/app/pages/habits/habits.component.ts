import { Component, OnInit} from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { MOCK_HABIT } from '../../mock/mock-habit';
@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.css'
})

export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
editingHabit: Habit | null = null; 
  ngOnInit() {
    this.habits = MOCK_HABIT;
  }
onEditHabit(habit: Habit) {
    this.editingHabit = { ...habit }; 
  }

  onAddHabit() {
    this.editingHabit = {
      id: 0,
      name: '',
      icon: '',
      color: '#007bff',
      goal: 1,
      progress: [],
      isActive: true,
      isExpired: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  onSaveHabit(updatedHabit: Habit) {
    if (updatedHabit.id === 0) {
      // новая привычка, добавляем с новым id
      updatedHabit.id = this.habits.length + 1;
      this.habits.push(updatedHabit);
    } else {

      const index = this.habits.findIndex(h => h.id === updatedHabit.id);
      if (index !== -1) {
        this.habits[index] = updatedHabit;
      }
    }
    this.editingHabit = null;
  }
handleDelete(habitToDelete: Habit): void {
  this.habits = this.habits.filter(h => h.id !== habitToDelete.id);
  //  сервис????
}

  onCancelEdit() {
    this.editingHabit = null; 
  }
}