import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { AddHabitComponent } from './components/add-habit/add-habit.component';
import { HabitDetailComponent } from './components/habit-detail/habit-detail.component';
import { WordOfTheDayComponent } from './components/word-of-the-day/word-of-the-day.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'habits', component: HabitsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: 'achievements', component: AchievementsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'dictionary', component: DictionaryComponent },
  { path: 'add-habit', component: AddHabitComponent },
  { path: 'habit-detail/:id', component: HabitDetailComponent },
  { path: 'word-of-the-day', component: WordOfTheDayComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
