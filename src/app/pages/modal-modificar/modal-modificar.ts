import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-modal-modificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-modificar.html',
  styleUrls: ['./modal-modificar.css']
})
export class ModalModificar implements OnChanges {
  @Input() mostrar = false;
  @Input() paises: Pais[] = [];
  @Input() persona: Persona | null = null;

  @Output() guardarPersona = new EventEmitter<Persona>();
  @Output() cerrarModal = new EventEmitter<void>();

  personaLocal: Persona = {
    nombre: '',
    email: '',
    fechaNacimiento: '',
    ciudad: null,
    provincia: null,
    pais: null
  };

  provincias: Provincia[] = [];
  ciudades: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['persona'] || changes['mostrar']) && this.mostrar && this.persona) {
      this.inicializarPersonaLocal(this.persona);
    }
  }
  inicializarPersonaLocal(persona: Persona) {
    this.personaLocal = JSON.parse(JSON.stringify(persona));

    if (typeof this.personaLocal.fechaNacimiento === 'string') {
      this.personaLocal.fechaNacimiento = this.personaLocal.fechaNacimiento.split('T')[0];
    }

    const paisCompleto = this.paises.find(p => p.id === this.personaLocal.pais?.id);
    this.provincias = paisCompleto?.provincias || [];

    if (this.personaLocal.provincia && this.provincias.length > 0) {
      const provinciaEncontrada = this.provincias.find(
        prov => prov.id === this.personaLocal.provincia!.id
      );
      this.personaLocal.provincia = provinciaEncontrada || null;

      // Cargar ciudades
      this.ciudades = this.personaLocal.provincia?.ciudades || [];
      console.log('Ciudades disponibles:', this.ciudades);
      console.log('Ciudad seleccionada:', this.personaLocal.ciudad);

      // Verificar que la ciudad exista en la lista
      if (!this.ciudades.includes(this.personaLocal.ciudad || '')) {
        // Asignar la primera ciudad válida para que el select muestre algo
        this.personaLocal.ciudad = this.ciudades.length > 0 ? this.ciudades[0] : null;
      }
    } else {
      this.ciudades = [];
      this.personaLocal.ciudad = null;
    }
  }
  onPaisChange() {
    if (this.personaLocal.pais) {
      this.provincias = this.personaLocal.pais.provincias;
      this.personaLocal.provincia = null;
      this.personaLocal.ciudad = null;
      this.ciudades = [];
    } else {
      this.provincias = [];
      this.ciudades = [];
      this.personaLocal.provincia = null;
      this.personaLocal.ciudad = null;
    }
  }

onProvinciaChange() {
  if (this.personaLocal.provincia) {
    this.ciudades = this.personaLocal.provincia.ciudades;
    this.personaLocal.ciudad = null;
  } else {
    this.ciudades = [];
    this.personaLocal.ciudad = null;
  }
}


  cerrar() {
    this.cerrarModal.emit();
  }

  guardar() {
    this.guardarPersona.emit(this.personaLocal);
  }

  compareById(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  compareProvincia(p1: Provincia | null, p2: Provincia | null): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

  comparePais(p1: Pais | null, p2: Pais | null): boolean {
    return p1 && p2 ? p1.id === p2.id : p1 === p2;
  }

}
