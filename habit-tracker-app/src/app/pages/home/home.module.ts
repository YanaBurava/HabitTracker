import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherComponent } from '../../components/weather/weather.component'; @NgModule({
  declarations: [HomeComponent, WeatherComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTooltipModule
  ]
})
export class HomeModule { }
