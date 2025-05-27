import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HabitsComponent } from './pages/habits/habits.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DictionaryComponent } from './pages/dictionary/dictionary.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AddHabitComponent } from './components/add-habit/add-habit.component';
import { HabitDetailComponent } from './components/habit-detail/habit-detail.component';
import { WordOfTheDayComponent } from './components/word-of-the-day/word-of-the-day.component';

@NgModule({
  declarations: [
    AppComponent,
    HabitsComponent,
    StatisticsComponent,
    ArchiveComponent,
    AchievementsComponent,
    SettingsComponent,
    DictionaryComponent,
    NavbarComponent,
    HomeComponent,
    AddHabitComponent,
    HabitDetailComponent,
    WordOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
