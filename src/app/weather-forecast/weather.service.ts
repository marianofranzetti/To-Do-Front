import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherDTO } from './weather';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
    private http = inject(HttpClient);
     private urlBase = environment.apiURL2 ;
   
     constructor() { }
   
     public obtenerTodos(): Observable<WeatherDTO[]>{
      console.log(this.urlBase)
       return this.http.get<WeatherDTO[]>(`${this.urlBase}/WeatherForecast`);
     }
   
}
