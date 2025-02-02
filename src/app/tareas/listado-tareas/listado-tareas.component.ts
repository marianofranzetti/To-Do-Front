import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TareasService } from '../tareas.service';
import { ListadoGenericoComponent } from '../../compartidos/componentes/listado-generico/listado-generico.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AutorizadoComponent } from '../../seguridad/autorizado/autorizado.component';
import { HttpResponse } from '@angular/common/http';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { IServicioCRUD } from '../../compartidos/interfaces/IServicioCRUD';
import { PaginacionDTO } from '../../compartidos/modelos/PaginacionDTO';

@Component({
  selector: 'app-listado-tareas',
  imports: [
    ListadoGenericoComponent,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    SweetAlert2Module,
    AutorizadoComponent,
  ],
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.css',
})
export class ListadoTareasComponent<TDTO, TCreacionDTO> {
  @Input({ required: true })
  tareas!: any[];

  /**
   *
   */
  constructor() {
      this.cargarRegistros();
  }

  tareasService = inject(TareasService);

  @Output()
  borrado = new EventEmitter<void>();

  borrar(id: number) {
    this.tareasService.borrar(id).subscribe(() => {
      this.borrado.emit();
      this.cargarRegistros();
    });
  }

  cargarRegistros() {
    this.servicioCRUD
      .obtenerPaginado(this.paginacion)
      .subscribe((respuesta: HttpResponse<TDTO[]>) => {
        this.entidades = respuesta.body as TDTO[];
        this.tareas = [...this.entidades];
        const cabecera = respuesta.headers.get(
          'cantidad-total-registros'
        ) as string;
        this.cantidadTotalRegistros = parseInt(cabecera, 10);
      });
  }

  servicioCRUD = inject(SERVICIO_CRUD_TOKEN) as IServicioCRUD<TDTO, TCreacionDTO>;
  entidades!: TDTO[];
  paginacion: PaginacionDTO = { pagina: 1, recordsPorPagina: 5 };
  cantidadTotalRegistros!: number;

  formDate(date: Date | string): string {
    if (!date) return ''; // Manejar valores nulos o indefinidos
    const fecha = new Date(date); // Asegurar que sea un objeto Date
    return fecha.toISOString().split('T')[0]; // Retorna YYYY-MM-DD
  }
}
