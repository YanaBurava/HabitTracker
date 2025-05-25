import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AddHabitComponent } from './components/add-habit/add-habit.component';
import { WordOfTheDayComponent } from './components/word-of-the-day/word-of-the-day.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    NavbarComponent,
    AddHabitComponent,
    WordOfTheDayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
   MatTabsModule,
   MatCardModule,
   MatSlideToggleModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
