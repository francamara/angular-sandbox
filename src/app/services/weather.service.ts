import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly url = 'https://api.open-meteo.com/v1/forecast?latitude=-34.52&longitude=-58.41&hourly=temperature_2m';

  constructor(private http: HttpClient) { }

  //Http Client get method
  public getWeather(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
