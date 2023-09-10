import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  readonly url = 'https://nominatim.openstreetmap.org/reverse?format=json';

  constructor(private http: HttpClient) { }


  getLocation = new Observable((observer) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        observer.next(position);
        observer.complete();
      },
      (error) => {
        observer.error(error);
      }
    );
  } else {
    observer.error('Geolocation is not available in this browser.');
  }
});


  public getLocationName(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(this.createUrl(latitude, longitude));
  }

  private createUrl(latitude: number, longitude: number): string {
    return `${this.url}&lat=${latitude}&lon=${longitude}`
  }
}
