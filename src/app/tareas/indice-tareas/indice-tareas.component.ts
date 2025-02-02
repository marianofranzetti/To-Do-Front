import { Component } from '@angular/core';
import { IndiceEntidadComponent } from "../../compartidos/componentes/indice-entidad/indice-entidad.component";
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-indice-tareas',
  imports: [IndiceEntidadComponent],
  templateUrl: './indice-tareas.component.html',
  styleUrl: './indice-tareas.component.css',
      providers: [
          { provide: SERVICIO_CRUD_TOKEN, useClass: TareasService }
      ]
})
export class IndiceTareasComponent {

}
