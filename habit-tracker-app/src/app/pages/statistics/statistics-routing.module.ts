import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './statistics.component';

const routes: Routes = [{ path: '', component: StatisticsComponent }];

@NgModule({
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
