import { Component, OnInit, ViewChild } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { MOCK_HABIT } from '../../mock/mock-habit';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})

export class HabitsComponent implements OnInit {
    habits: Habit[] = [];
  editingHabit: Habit | null = null;
  groupedHabits: { [group: string]: Habit[] } = {};
  selectedGroup: string = 'All';
  Object = Object;

 
   pageSize = 5;
  currentPageIndex = 0;
  pagedHabits: Habit[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

 ngOnInit() {
    this.habits = MOCK_HABIT.map(habit => ({
      ...habit,
      startDate: new Date(habit.startDate),
      endDate: habit.endDate ? new Date(habit.endDate) : null
    }));

    this.updateHabitStatuses();
    this.groupHabits();
    this.updatePagedHabits();
  }

  updateHabitStatuses() {
    const now = new Date();
    this.habits.forEach(habit => {
      habit.isActive = habit.startDate <= now && (!habit.endDate || habit.endDate >= now);
      habit.isExpired = habit.endDate ? habit.endDate < now : false;
    });
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

  onSelectGroup(group: string) {
    this.selectedGroup = group;
    this.currentPageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.updatePagedHabits();
  }

  updatePagedHabits() {
    const filteredHabits = this.selectedGroup === 'All' ? this.habits : this.groupedHabits[this.selectedGroup] || [];
    const startIndex = this.currentPageIndex * this.pageSize;
    this.pagedHabits = filteredHabits.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPageIndex = event.pageIndex;
    this.updatePagedHabits();
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
      endDate: null
    };
  }

  onSaveHabit(updatedHabit: Habit) {
    if (updatedHabit.id === 0) {
      updatedHabit.id = this.habits.length + 1;
      this.habits.push(updatedHabit);
    } else {
      const index = this.habits.findIndex(h => h.id === updatedHabit.id);
      if (index !== -1) {
        this.habits[index] = updatedHabit;
      }
    }
    this.groupHabits();
    this.currentPageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.updatePagedHabits();
    this.editingHabit = null;
  }

  handleDelete(habitToDelete: Habit) {
    this.habits = this.habits.filter(h => h.id !== habitToDelete.id);
    this.groupHabits();
    this.currentPageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.updatePagedHabits();
  }

  onCancelEdit() {
    this.editingHabit = null;
  }
getIconForGroup(group: string): string {
  const iconMap: Record<string, string> = {
    General: 'home',
    Fitness: 'fitness_center',
    Reading: 'menu_book',
    Relax: 'spa',
    Food: 'restaurant',
    Study: 'school',
    Sleep: 'bedtime',
  };
  return iconMap[group] || 'category';
}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}