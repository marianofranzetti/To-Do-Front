import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {  fechaNoPuedeSerPasada, primeraLetraMayuscula } from '../../compartidos/funciones/validaciones';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TareaCreacionDTO, TareaDTO } from '../tareas';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-formulario-tarea',
  imports: [MatButtonModule, RouterLink, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  templateUrl: './formulario-tarea.component.html',
  styleUrl: './formulario-tarea.component.css'
})
export class FormularioTareaComponent implements OnInit {
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  @Input()
  modelo?: TareaDTO;

  @Output()
  posteoFormulario = new EventEmitter<TareaCreacionDTO>();

  private formbuilder = inject(FormBuilder);

  form = this.formbuilder.group({
    nombre: ['', {validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(100)]}],
    descripcion: ['', {validators: [Validators.required, primeraLetraMayuscula(), Validators.maxLength(500)]}],
    fechaLimite: new FormControl<Date | string | null>(null, {validators: [Validators.required, fechaNoPuedeSerPasada()]})
  })


  obtenerErrorCampoNombre(): string {
    let nombre = this.form.controls.nombre;

    if (nombre.hasError('required')){
      return "El campo nombre es requerido";
    }

    if (nombre.hasError('maxlength')){
      return `El campo nombre no puede tener más de ${nombre.getError('maxlength').requiredLength} caracteres`;
    }

    if (nombre.hasError('primeraLetraMayuscula')){
      return nombre.getError('primeraLetraMayuscula').mensaje;
    }

    return "";

  }


  obtenerErrorCampoDescripcion(): string {
    let descripcion = this.form.controls.descripcion;

    if (descripcion.hasError('required')){
      return "El campo nombre es requerido";
    }

    if (descripcion.hasError('maxlength')){
      return `El campo nombre no puede tener más de ${descripcion.getError('maxlength').requiredLength} caracteres`;
    }

    if (descripcion.hasError('primeraLetraMayuscula')){
      return descripcion.getError('primeraLetraMayuscula').mensaje;
    }

    return "";

  }

  
  obtenerErrorCampoFechaLimite(){
    let campo = this.form.controls.fechaLimite;

    if (campo.hasError('required')){
      return 'El campo Fecha Limite es requerido';
    }

    if (campo.hasError("pasado")){
      return campo.getError('pasado').mensaje;
    }

    return "";
  }

  guardarCambios() {
    if (!this.form.valid){
      return;
    }

    const tarea = this.form.value as TareaCreacionDTO;
    this.posteoFormulario.emit(tarea);

  }

}