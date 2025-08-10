import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.scss'],
  standalone: false,
})
export class CircularProgressComponent implements OnChanges {
  @Input() progress = 0; 

  radius = 50;
  circumference = 2 * Math.PI * this.radius;
  strokeDashoffset = this.circumference;

  ngOnChanges(): void {
    const validProgress = Math.min(100, Math.max(0, this.progress));
    this.strokeDashoffset = this.circumference - (this.circumference * validProgress) / 100;
  }
}


