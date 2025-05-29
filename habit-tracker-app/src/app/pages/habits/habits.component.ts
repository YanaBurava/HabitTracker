import { Component, OnInit, ViewChild } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})

export class HabitsComponent implements OnInit {
  habits: Habit[] = [];
  groupedHabits: { [group: string]: Habit[] } = {};
  selectedGroup: string = 'All';
  pagedHabits: Habit[] = [];
  editingHabit: Habit | null = null;
  readonly pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  currentPageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private habitService: HabitService) {}

  ngOnInit(){
    const rawHabits = this.habitService.getHabits();
    this.habits = this.habitService.updateHabitStatuses(rawHabits);
    this.groupedHabits = this.habitService.groupHabits(this.habits);
    this.updatePagedHabits();
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
    const filteredHabits = this.selectedGroup === 'All'
      ? this.habits
      : this.groupedHabits[this.selectedGroup] || [];

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
      const index = this.habits.findIndex(habit => habit.id === updatedHabit.id);
      if (index !== -1) {
        this.habits[index] = updatedHabit;
      }
    }

    this.habits = this.habitService.updateHabitStatuses(this.habits);
    this.groupedHabits = this.habitService.groupHabits(this.habits);
    this.currentPageIndex = 0;

    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.updatePagedHabits();
    this.editingHabit = null;
  }

  handleDelete(habitToDelete: Habit) {
    this.habits = this.habits.filter(habit => habit.id !== habitToDelete.id);
    this.habits = this.habitService.updateHabitStatuses(this.habits);
    this.groupedHabits = this.habitService.groupHabits(this.habits);
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
    return this.habitService.getIconForGroup(group);
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}