import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { Habit } from '../../models/habit.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogData } from './confirm-dialog/confirm-dialog-data.interface';
import { ConfirmDialogLabel } from './confirm-dialog/confirm-dialog-label.enum';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-habits',
  standalone: false,
  templateUrl: './habits.component.html',
  styleUrl: './habits.component.scss'
})
export class HabitsComponent implements OnInit, OnDestroy {
  habits: Habit[] = [];
  groupedHabits: { [group: string]: Habit[] } = {};
  selectedGroup: string = 'All';
  pagedHabits: Habit[] = [];
  editingHabit: Habit | null = null;
  readonly pageSizeOptions = [5, 10, 25];
  pageSize = 10;
  currentPageIndex = 0;

private subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private habitService: HabitService, private dialog: MatDialog, private router: Router) {}
  ngOnInit() {
 this.subscription.add(
    this.habitService.habits$.subscribe(habits => {
      this.habits = habits;
      this.groupedHabits = this.habitService.groupHabits(habits);
      this.updatePagedHabits();
    })
  );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectGroup(group: string) {
    this.selectedGroup = group;
    this.currentPageIndex = 0;
    this.paginator?.firstPage();
    this.updatePagedHabits();
  }

  updatePagedHabits() {
    const filteredByGroup = this.selectedGroup === 'All'
      ? this.habits
      : this.groupedHabits[this.selectedGroup] || [];

    const filteredBySearch = filteredByGroup.filter(habit =>
      habit.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = this.currentPageIndex * this.pageSize;
    this.pagedHabits = filteredBySearch.slice(startIndex, startIndex + this.pageSize);
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
      this.habitService.addHabit(updatedHabit);
    } else {
      this.habitService.updateHabit(updatedHabit);
    }

    this.paginator?.firstPage();
    this.currentPageIndex = 0;
    this.editingHabit = null;
  }

  handleDelete(habitToDelete: Habit) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Delete Habit',
        message: `Are you sure you want to delete "${habitToDelete.name}"?`,
        confirmLabel: 'Delete',
        cancelLabel: 'Cancel'
      } as ConfirmDialogData
    });

   dialogRef.afterClosed()
  .pipe(
    filter(result => result === true)
  )
  .subscribe(() => {
    this.habitService.deleteHabit(habitToDelete.id);
    this.habits = this.habitService.updateHabitStatuses(this.habitService.getHabits());
    this.groupedHabits = this.habitService.groupHabits(this.habits);
    this.currentPageIndex = 0;
    this.paginator?.firstPage();
    this.updatePagedHabits();
  });
  }

  onCancelEdit(): void {
    this.editingHabit = null;
  }

  getIconForGroup(group: string): string {
    return this.habitService.getIconForGroup(group);
  }

  get habitGroups(): string[] {
    return Object.keys(this.groupedHabits);
  }

  isGroupSelected(group: string): 'primary' | '' {
    return this.selectedGroup === group ? 'primary' : '';
  }

  searchTerm = '';

  onSearchChange() {
    this.currentPageIndex = 0;
    this.updatePagedHabits();
  }

}
