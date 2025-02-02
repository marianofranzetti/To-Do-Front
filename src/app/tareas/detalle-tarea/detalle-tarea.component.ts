import { Component, inject, Input, numberAttribute, OnInit } from '@angular/core';
import { CargandoComponent } from '../../compartidos/componentes/cargando/cargando.component';
import { TareasService } from '../tareas.service';
import { SeguridadService } from '../../seguridad/seguridad.service';
import { TareaDetalleDTO, TareaDTO } from '../tareas';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle-tarea',
  imports: [CargandoComponent, MatCardModule, MatButtonModule],
  templateUrl: './detalle-tarea.component.html',
  styleUrl: './detalle-tarea.component.css'
})
export class DetalleTareaComponent implements OnInit {
compartirTask() {
alert("muchas gracias por querer compartir tu tarea")
}
likeTask() {
alert('nos alegra que te guste la tarea');
}


  @Input({transform: numberAttribute})
  id!: number;

  tareasService = inject(TareasService);
  seguridadService = inject(SeguridadService);
  tarea!: TareaDetalleDTO;
  sanitizer = inject(DomSanitizer);
  trailerURL!: SafeResourceUrl;

  ngOnInit(): void {
    this.tareasService.obtenerPorId(this.id).subscribe(tarea => {
      this.tarea = tarea;
    });
  }
}
