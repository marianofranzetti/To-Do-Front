import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ListadoGenericoComponent } from "../compartidos/componentes/listado-generico/listado-generico.component";
import { HttpResponse } from '@angular/common/http';
import { WeatherService } from './weather.service';
import { SERVICIO_CRUD_TOKEN } from '../compartidos/proveedores/proveedores';
import { IServicioCRUD } from '../compartidos/interfaces/IServicioCRUD';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-weather-forecast',
  imports: [ListadoGenericoComponent],
  templateUrl: './weather-forecast.component.html',
  styleUrl: './weather-forecast.component.css'
})
export class WeatherForecastComponent implements OnInit {

   @Input({ required: true })
    climas!: any[];
    cantidadTotalRegistros!: number;

    /**
     *
     */
    constructor() {
        
    }
  ngOnInit(): void {
    this.cargarRegistros();
  }
  
    climaService = inject(WeatherService);
  
    @Output()
    borrado = new EventEmitter<void>();
  
   
  
    cargarRegistros() {
       this.climaService.obtenerTodos()
        .subscribe((respui) => {
         this.climas = respui;
        });
    }
  

    formDate(date: Date | string): string {
      if (!date) return ''; // Manejar valores nulos o indefinidos
      const fecha = new Date(date); // Asegurar que sea un objeto Date
      return fecha.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
    }
}
