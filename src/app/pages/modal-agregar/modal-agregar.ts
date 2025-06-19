import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais, Persona, Provincia } from '../../interface/modales.dto';



@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-agregar.html',
  styleUrl: './modal-agregar.css'
})
export class ModalAgregar{
  formulario: FormGroup;
  error = '';
  constructor(private fb: FormBuilder){
    this.formulario=this.fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['',[Validators.required]],
      pais: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      ciudad: [null, [Validators.required]]
    })
  }

  @Input() mostrar: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardarPersona = new EventEmitter<Persona>();
  @Input() paises: Pais[] =[];

  provincias: Provincia[] = [];
  ciudades: string[] = [];

  cerrar() {
    this.cerrarModal.emit();
    this.formulario.reset();
    this.provincias = [];
    this.ciudades = [];
  }
  agregarPersona() {
    if (this.formulario.invalid) {
      this.error="Completa todos los campos correctamente."
      return;
    }
    const persona: Persona = this.formulario.value;
    this.guardarPersona.emit(persona);
    this.formulario.reset();
    this.provincias = [];
    this.ciudades = [];
    this.cerrar();
  }

  onPaisChange() {
    const pais = this.formulario.get('pais')?.value;
    this.provincias = pais?.provincias || [];
    this.formulario.get('provincia')?.setValue(null);
    this.formulario.get('ciudad')?.setValue(null);
    this.ciudades = [];
  }

  onProvinciaChange() {
    const provincia = this.formulario.get('provincia')?.value;
    this.ciudades = provincia?.ciudades || [];
    this.formulario.get('ciudad')?.setValue(null);
  }
}