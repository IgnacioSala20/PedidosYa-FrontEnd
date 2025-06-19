import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Primero define las interfaces de apoyo
interface Provincia {
  id: number;
  name: string;
  ciudades: string[];
}

interface Pais {
  id: number;
  name: string;
  provincias: Provincia[];
}

interface Persona {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  ciudad: string | null;
  provincia: Provincia | null;
  pais: Pais | null;
}

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agregar.html',
  styleUrl: './modal-agregar.css'
})
export class ModalAgregar implements OnChanges{
  @Input() mostrar: boolean = false;
  @Input() nuevaPersona: Persona = {
    nombre: '',
    email: '',
    fechaNacimiento: '',
    ciudad: null,
    provincia: null,
    pais: null
  };

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardarPersona = new EventEmitter<Persona>();
  @Input() paises: Pais[] =[];


  provincias: Provincia[] = [];
  ciudades: string[] = [];

  cerrar() {
    this.cerrarModal.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nuevaPersona'] && this.nuevaPersona) {
      // Reinicializa las provincias y ciudades si la persona cambia
      this.provincias = this.nuevaPersona.pais?.provincias ?? [];
      this.ciudades = this.nuevaPersona.provincia?.ciudades ?? [];
    }
  }
agregarPersona() {
  if (this.formularioValido()) {
    const persona: Persona = {
      ...this.nuevaPersona,
    };

    console.log('Fecha para guardar:', persona.fechaNacimiento); // yyyy-MM-dd
    this.guardarPersona.emit(persona);
    this.cerrar();
  }
}
private formularioValido(): boolean {
  const p = this.nuevaPersona;
  return !!(p.nombre && p.email && p.fechaNacimiento && p.ciudad && p.provincia && p.pais);
}
  onPaisSeleccionado(pais: Pais | null) {
  this.nuevaPersona.pais = pais;
  this.nuevaPersona.provincia = null;
  this.nuevaPersona.ciudad = null;
  } 

  onPaisChange() {
    if (this.nuevaPersona.pais) {
      this.provincias = this.nuevaPersona.pais.provincias;
    } else {
      this.provincias = [];
    }
    this.nuevaPersona.provincia = null;
    this.ciudades = [];
    this.nuevaPersona.ciudad = null;
  }

  onProvinciaChange() {
    if (this.nuevaPersona.provincia) {
      this.ciudades = this.nuevaPersona.provincia.ciudades;
    } else {
      this.ciudades = [];
    }
    this.nuevaPersona.ciudad = null;
  }
}