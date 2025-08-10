import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { WeatherComponent } from '../../components/weather/weather.component'; @NgModule({
  declarations: [HomeComponent, WeatherComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatIconModule,
    MatTooltipModule, 
       MatDatepickerModule,
    MatNativeDateModule,
  ]
})
export class HomeModule { }
