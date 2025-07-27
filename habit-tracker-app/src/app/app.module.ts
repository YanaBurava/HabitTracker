import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AchievementsComponent } from './pages/achievements/achievements.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HabitDetailComponent } from './components/habit-detail/habit-detail.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CircularProgressComponent } from './components/circular-progress/circular-progress.component'; 
@NgModule({
  declarations: [
    AppComponent,
    AchievementsComponent,
    NavbarComponent,
    HabitDetailComponent,
    CircularProgressComponent,
  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatTooltipModule,
  MatTabsModule,
  MatCardModule,
  CommonModule,
  HttpClientModule,
  NgCircleProgressModule.forRoot({
      radius: 60,
      outerStrokeWidth: 10,
      innerStrokeWidth: 10,
      outerStrokeColor: '#4caf50',
      innerStrokeColor: '#e6e6e6',
      animationDuration: 300,
      showTitle: false,
      showUnits: false,
      showSubtitle: false,
      showBackground: false,
      responsive: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
