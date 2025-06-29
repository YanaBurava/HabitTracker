import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayRoutingModule } from './today-routing.module';
import { TodayComponent } from './today.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TodayComponent
  ],
  imports: [
    CommonModule,
    TodayRoutingModule,
    MatIconModule
  ]
})
export class TodayModule { }
