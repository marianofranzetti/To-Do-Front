import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TareaCreacionDTO, TareaDetalleDTO, TareaDTO } from './tareas';
import { PaginacionDTO } from '../compartidos/modelos/PaginacionDTO';
import { construirQueryParams } from '../compartidos/funciones/construirQueryParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private http = inject(HttpClient);
    private urlBase = environment.apiURL + '/tareas';
  
    constructor() { }
  
    public obtenerPaginado(paginacion: PaginacionDTO): Observable<HttpResponse<TareaDTO[]>> {
      let queryParams = construirQueryParams(paginacion);
      return this.http.get<TareaDTO[]>(this.urlBase, {params: queryParams, observe: 'response'});
    }
  
    public obtenerTodos(): Observable<TareaDTO[]>{
      return this.http.get<TareaDTO[]>(`${this.urlBase}/all`);
    }
  
    public obtenerPorId(id: number): Observable<TareaDetalleDTO>{
      return this.http.get<TareaDetalleDTO>(`${this.urlBase}/${id}`);
    }
  
    public actualizar(id: number, tarea: TareaCreacionDTO): Observable<any>{
      return this.http.put(`${this.urlBase}/${id}`, tarea);
    }
  
    public crear(tarea: TareaCreacionDTO): Observable<any>{
      return this.http.post(this.urlBase, tarea);
    }
  
    public borrar(id: number): Observable<any>{
      return this.http.delete(`${this.urlBase}/${id}`);
    }

      public filtrar(valores: any): Observable<HttpResponse<TareaDTO[]>>{
        const params = new HttpParams({fromObject: valores});
        return this.http.get<TareaDTO[]>(`${this.urlBase}/filter`, {params, observe: 'response'});
      }
      
}
