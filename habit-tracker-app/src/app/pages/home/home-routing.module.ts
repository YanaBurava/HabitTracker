import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import {HabitDetailComponent } from '../../components/habit-detail/habit-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
   { path: 'detail/:id', component: HabitDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
