import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HabitsComponent } from './habits.component';
import { HabitFormComponent } from './habit-form/habit-form.component';

const routes: Routes = [
  { path: '', component: HabitsComponent },
  { path: 'new', component: HabitFormComponent },
  { path: 'edit/:id', component: HabitFormComponent },

];

@NgModule({
  exports: [RouterModule]
})
export class HabitsRoutingModule {}
