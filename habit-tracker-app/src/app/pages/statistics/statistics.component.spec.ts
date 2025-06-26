import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { RadarChartComponent } from '../../components/radar-chart/radar-chart.component';
import { NgChartsModule } from 'ng2-charts';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticsComponent, RadarChartComponent],
      imports: [NgChartsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
