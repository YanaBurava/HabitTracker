import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private API_KEY = '248d369aa6322178f4f2620b2da7f29c';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherResponse> {
    const url = `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`;
    return this.http.get<WeatherResponse>(url);
  }
}
