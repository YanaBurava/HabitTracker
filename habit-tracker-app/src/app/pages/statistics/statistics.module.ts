import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatisticsComponent } from './statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { RadarChartComponent} from '../../components/radar-chart/radar-chart.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [StatisticsComponent,  
      RadarChartComponent
],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgChartsModule,
    DragDropModule,
      ],
       exports: [RadarChartComponent]
})
export class StatisticsModule { }
