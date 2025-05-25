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
  groupedHabits: { [group: string]: Habit[] } = {};
  Object = Object;
 
  ngOnInit() {
    this.habits = MOCK_HABIT;
     this.groupHabits();
  }

  groupHabits() {
 this.groupedHabits = this.habits.reduce((acc, habit) => {
      const group = habit.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(habit);
      return acc;
    }, {} as { [group: string]: Habit[] });
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
      progress: [],
      goal: 1,
      group: 'Default',
      isActive: true,
      isExpired: false,
      startDate: new Date(),
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
    this.groupHabits();
    this.editingHabit = null;
  }
handleDelete(habitToDelete: Habit): void {
  this.habits = this.habits.filter(h => h.id !== habitToDelete.id);
   this.groupHabits();
  //  сервис????
}

  onCancelEdit() {
    this.editingHabit = null; 
  }

   objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}