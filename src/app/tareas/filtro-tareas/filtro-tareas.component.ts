import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TareasService } from '../tareas.service';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';
import { TareaDTO } from '../tareas';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FiltroTareas } from './filtroTarea';
import {Location} from '@angular/common'
import { debounceTime } from 'rxjs';
import { ListadoTareasComponent } from '../listado-tareas/listado-tareas.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutorizadoComponent } from "../../seguridad/autorizado/autorizado.component";
import { fechaNoPuedeSerFutura, fechaNoPuedeSerPasada } from '../../compartidos/funciones/validaciones';
import { MatChipsModule } from '@angular/material/chips';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
 selector: 'app-filtro-tareas',
 imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule,
    MatInputModule, MatSelectModule, MatCheckboxModule, ListadoTareasComponent, MatPaginatorModule,
    MatDatepickerModule, RouterLink, AutorizadoComponent, MatChipsModule],
 templateUrl: './filtro-tareas.component.html',
 styleUrl: './filtro-tareas.component.css',
       providers: [
           { provide: SERVICIO_CRUD_TOKEN, useClass: TareasService }
       ]
})
export class FiltroTareasComponent implements OnInit {


ObtenerErrorFecha() : string {
  let fechaLimite = this.form.controls.fechaLimite;

  if (fechaLimite.hasError('pasado') && fechaLimite.value){
    return fechaLimite.getError('pasado').mensaje;
  }

  return "";
}


  formDate(date: Date | string): string {
    if (!date) return ''; // Manejar valores nulos o indefinidos
    const fecha = new Date(date); // Asegurar que sea un objeto Date
    return fecha.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
  }
  tareasService = inject(TareasService);
  paginacion: PaginacionDTO = {pagina: 1, recordsPorPagina: 10};
  cantidadTotalRegistros!: number;

  ngOnInit(): void {

    this.tareasService.obtenerTodos().subscribe(tareas => {
      this.tareas = tareas;

    //  this.leerValoresURL();
      this.buscarTareas(this.form.value as FiltroTareas);

      this.form.valueChanges
      .pipe(
        debounceTime(300)
      )
      .subscribe(valores => {
       // console.log(valores);
        this.buscarTareas(valores as FiltroTareas)
        this.escribirParametrosBusquedaEnURL(valores as FiltroTareas);
      });
    });

  
  
  }

  buscarTareas(valores: FiltroTareas) {
   valores.pagina = this.paginacion.pagina;
   valores.recordsPorPagina = this.paginacion.recordsPorPagina;

   this.tareasService.filtrar(valores).subscribe(respuesta => {
    this.tareas = respuesta.body as TareaDTO[];
    const cabecera = respuesta.headers.get('cantidad-total-registros') as string;
    this.cantidadTotalRegistros = parseInt(cabecera, 10);
   });
  }

  escribirParametrosBusquedaEnURL(valores: FiltroTareas){
    let queryStrings = [];

    if (valores.nombre){
      queryStrings.push(`nombre=${encodeURIComponent(valores.nombre)}`);
    }

    if (valores.descripcion){
      queryStrings.push(`descripcion=${encodeURIComponent(valores.nombre)}`);
    }

    if (valores.fechaLimite) {
      let fechaISO = new Date(valores.fechaLimite).toISOString().split('T')[0]; // "YYYY-MM-DD"
      queryStrings.push(`fechaLimite=${encodeURIComponent(fechaISO)}`);
    }

    this.location.replaceState('tareas/filtrar', queryStrings.join('&'));
  }

  leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params: any) => {
      var objeto: any = {};

      if (params.nombre){
        objeto.nombre = params.nombre;
      }

      if (params.descripcion){
        objeto.descripcion = params.descripcion;
      }

      this.form.patchValue(objeto);

    });
  }

  limpiar(){
    this.form.patchValue({nombre: '', descripcion: '', fechaLimite: null});
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginacion = {pagina: datos.pageIndex + 1, recordsPorPagina: datos.pageSize};
    this.buscarTareas(this.form.value as FiltroTareas);
  }

  dateFilter = (date: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Asegúrate de comparar solo la fecha (sin la hora)
    return date ? date >= today : false; // Deshabilita las fechas anteriores a hoy
  }

  private formBuilder = inject(FormBuilder);
  private location = inject(Location);

  private activatedRoute = inject(ActivatedRoute);

  form = this.formBuilder.group({
    nombre: [''],
    descripcion: [''],
    fechaLimite: new FormControl<Date | null>(null, {
      validators: [fechaNoPuedeSerPasada()]
    })
  })
  tareas!: TareaDTO[];
}

