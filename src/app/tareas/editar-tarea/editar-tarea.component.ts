import { Component, Input, numberAttribute } from '@angular/core';
import { EditarEntidadComponent } from '../../compartidos/componentes/editar-entidad/editar-entidad.component';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';
import { TareasService } from '../tareas.service';

@Component({
  selector: 'app-editar-tarea',
  imports: [EditarEntidadComponent],
  templateUrl: './editar-tarea.component.html',
  styleUrl: './editar-tarea.component.css',
      providers: [
          { provide: SERVICIO_CRUD_TOKEN, useClass: TareasService }
      ]
})
export class EditarTareaComponent {

  @Input({ transform: numberAttribute })
  id!: number;
  formularioTarea = FormularioTareaComponent;
}
