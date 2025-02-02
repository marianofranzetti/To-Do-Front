import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CrearEntidadComponent } from '../../compartidos/componentes/crear-entidad/crear-entidad.component';
import { FormularioTareaComponent } from '../formulario-tarea/formulario-tarea.component';
import { TareasService } from '../tareas.service';
import { SERVICIO_CRUD_TOKEN } from '../../compartidos/proveedores/proveedores';

@Component({
  selector: 'app-crear-tareas',
    imports: [MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, CrearEntidadComponent],
  templateUrl: './crear-tareas.component.html',
  styleUrl: './crear-tareas.component.css',
   providers: [
          { provide: SERVICIO_CRUD_TOKEN, useClass: TareasService }
      ]
  })
export class CrearTareasComponent {
formularioTareas = FormularioTareaComponent;
}
