import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { HabitDetailComponent } from './components/habit-detail/habit-detail.component';

const routes: Routes = [
 {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
{
    path: 'habits',
    loadChildren: () =>
      import('./pages/habits/habits.module').then(m => m.HabitsModule)
  },
  {
    path: 'today',
    loadChildren: () =>
      import('./pages/today/today.module').then(m => m.TodayModule)
  },
  {
    path: 'archive',
    loadChildren: () =>
      import('./pages/archive/archive.module').then(m => m.ArchiveModule)
  },
  {
    path: 'statistics',
    loadChildren: () =>
      import('./pages/statistics/statistics.module').then(m => m.StatisticsModule)
  },
  { path: 'achievements', component: AchievementsComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'habit/:id', component: HabitDetailComponent },
   { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
