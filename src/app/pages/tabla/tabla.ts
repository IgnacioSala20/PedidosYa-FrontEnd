import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAgregar } from '../modal-agregar/modal-agregar';
import { ModalModificar } from '../modal-modificar/modal-modificar';
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
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAgregar, ModalModificar],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Tabla{
  searchTerm = '';
  mostrarModal = false;
  selectedItem: Persona | null = null;
  mostrarModalModificar = false;

  items: Persona[] = [
    {
      nombre: 'Martin',
      email: 'martin@gmail.com',
      fechaNacimiento: new Date(2002, 11, 20),
      ciudad: 'Mendoza',
      provincia: {
        id: 1,
        name: 'Mendoza',
        ciudades: ['Mendoza Capital', 'San Rafael']
      },
      pais: {
        id: 1,
        name: 'Argentina',
        provincias: [] // Lo podés completar si querés usarlo luego en selects
      }
    }
  ];
  paises: Pais[] = [
    {
      id: 1,
      name: 'Argentina',
      provincias: [
        {
          id: 1,
          name: 'Mendoza',
          ciudades: ['Mendoza Capital', 'San Rafael']
        },
        {
          id: 2,
          name: 'Buenos Aires',
          ciudades: ['La Plata', 'Mar del Plata']
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
          ciudades: ['Santiago Centro', 'Providencia']
        }
      ]
    }
  ];
  filteredItems: Persona[] = [...this.items];
  
  nuevaPersona: Persona = {
    nombre: '',
    email: '',
    fechaNacimiento: new Date(),
    ciudad: null,
    provincia: null,
    pais: null
  };
  constructor(public themeService: ThemeService) {
    this.filteredItems = [...this.items];
  }

  filterItems() {
    if (!this.searchTerm) {
      this.filteredItems = [...this.items];
      return;
    }
    
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.nombre.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.ciudad?.toLowerCase().includes(term) ||
      item.provincia?.name.toLowerCase().includes(term) ||
      item.pais?.name.toLowerCase().includes(term)
    );
  }
  formatDate(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }
  abrirModal() {
    this.nuevaPersona = {
      nombre: '',
      email: '',
      fechaNacimiento: new Date,
      ciudad: null,
      provincia: null,
      pais: null
    };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

agregarPersona(persona: Persona) {
  // Validación adicional por seguridad
  if (!persona.nombre || !persona.email || !persona.fechaNacimiento) {
    console.error('Datos incompletos');
    return;
  }

  // Agregar a la lista
  this.items.push({
    ...persona,
    fechaNacimiento: new Date(persona.fechaNacimiento) // Asegurar que es Date
  });
  console.log(this.items)
  console.log("hola")
  // Actualizar lista filtrada
  this.filteredItems = [...this.items];
  
  // Cerrar modal
  this.mostrarModal = false;
  
  // Opcional: Resetear búsqueda
  this.searchTerm = '';
  this.filterItems();
}

  seleccionarFila(item: Persona) {
    this.selectedItem = this.selectedItem === item ? null : item;
    console.log('Fila seleccionada:', this.selectedItem);
  }

  abrirModalModificar() {
    if (this.selectedItem) {
      this.mostrarModalModificar = true;
    } else {
      alert('Selecciona una persona para modificar');
    }
  }
  modificarPersona(personaModificada: Persona) {
    if (!personaModificada || !this.selectedItem) return;

    // Convertir fechaNacimiento a tipo Date si es string
    const fechaNacimiento = typeof personaModificada.fechaNacimiento === 'string'
      ? new Date(personaModificada.fechaNacimiento)
      : personaModificada.fechaNacimiento;

    const index = this.items.indexOf(this.selectedItem);
    if (index !== -1) {
      this.items[index] = {
        ...personaModificada,
        fechaNacimiento: fechaNacimiento
      };
      this.filteredItems = [...this.items];
      this.selectedItem = null;
      this.mostrarModalModificar = false;
    }
  }

}