import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { WeatherResponse } from '../../models/weather.model';

@Component({
  selector: 'app-weather',
    standalone: false,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherData!: WeatherResponse;
  loading = true;
  error = '';

  constructor(private weatherService: WeatherService) {}

 ngOnInit(): void {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      this.weatherService.getWeatherByCoords(latitude, longitude).subscribe({
        next: (data) => {
          this.weatherData = data;
          this.loading = false;
        },
        error: () => {
          this.error = 'Unable to fetch weather data.';
          this.loading = false;
        }
      });
    },
    (error) => {
      this.error = 'Location permission denied.';
      this.loading = false;
    }
  );
}
getTime(unix: number): string {
    return new Date(unix * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
