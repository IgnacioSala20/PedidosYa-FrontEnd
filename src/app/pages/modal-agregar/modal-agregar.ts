import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  fechaNacimiento: Date | string;
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
export class ModalAgregar {
  @Input() mostrar: boolean = false;
  @Input() nuevaPersona: Persona = {
    nombre: '',
    email: '',
    fechaNacimiento: new Date(),
    ciudad: null,
    provincia: null,
    pais: null
  };


  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardarPersona = new EventEmitter<Persona>();

  paises: Pais[] = [
    {
      id: 1,
      name: 'Argentina',
      provincias: [
        {
          id: 1,
          name: 'Buenos Aires',
          ciudades: ['La Plata', 'Mar del Plata', 'Bahía Blanca']
        },
        {
          id: 2,
          name: 'Mendoza',
          ciudades: ['Mendoza Capital', 'San Rafael']
        }
      ]
    },
    {
      id: 2,
      name: 'Chile',
      provincias: [
        {
          id: 3,
          name: 'Santiago',
          ciudades: ['Santiago Centro', 'Las Condes']
        }
      ]
    }
  ];

  provincias: Provincia[] = [];
  ciudades: string[] = [];

  cerrar() {
    this.cerrarModal.emit();
  }

  
agregarPersona() {
  if (this.formularioValido()) {
    // Normalizar fecha a Date si es string
    const fecha = typeof this.nuevaPersona.fechaNacimiento === 'string'
      ? new Date(this.nuevaPersona.fechaNacimiento)
      : this.nuevaPersona.fechaNacimiento;

    const persona: Persona = {
      ...this.nuevaPersona,
      fechaNacimiento: fecha
    };

    this.guardarPersona.emit(persona);
    this.cerrar();
  }
}
private formularioValido(): boolean {
  const p = this.nuevaPersona;
  return !!(p.nombre && p.email && p.fechaNacimiento && p.ciudad && p.provincia && p.pais);
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