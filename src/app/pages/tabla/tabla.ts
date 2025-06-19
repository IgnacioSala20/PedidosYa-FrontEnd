import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAgregar } from '../modal-agregar/modal-agregar';
import { ModalModificar } from '../modal-modificar/modal-modificar';
import { Paginacion } from '../paginacion/paginacion';
import { TripleBoton } from '../triple-boton/triple-boton';
interface Provincia {
  id: number;
  name: string;
  ciudades: string[];
}
function toLocalDate(dateStr: string): Date {
  const date = new Date(dateStr);
  const timeOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + timeOffset);
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
  imports: [CommonModule, FormsModule, ModalAgregar, ModalModificar,Paginacion, TripleBoton],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Tabla{
  searchTerm = '';
  mostrarModal = false;
  selectedItem: Persona | null = null;
  
  mostrarModalModificar = false;
  
  paginaActual: number = 1;
  elementosPorPagina: number = 2;
  
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
      provincias: []
    }
  },
  {
    nombre: 'Lucia',
    email: 'lucia@example.com',
    fechaNacimiento: new Date(1995, 5, 14),
    ciudad: 'Rosario',
    provincia: {
      id: 2,
      name: 'Santa Fe',
      ciudades: ['Rosario', 'Santa Fe Capital']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Pedro',
    email: 'pedro123@gmail.com',
    fechaNacimiento: new Date(1988, 8, 30),
    ciudad: 'Buenos Aires',
    provincia: {
      id: 3,
      name: 'Buenos Aires',
      ciudades: ['La Plata', 'Mar del Plata']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Ana',
    email: 'ana.rosales@mail.com',
    fechaNacimiento: new Date(1992, 0, 5),
    ciudad: 'Córdoba',
    provincia: {
      id: 4,
      name: 'Córdoba',
      ciudades: ['Córdoba Capital', 'Villa Carlos Paz']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Jorge',
    email: 'jorge.torres@mail.com',
    fechaNacimiento: new Date(1979, 3, 22),
    ciudad: 'Salta',
    provincia: {
      id: 5,
      name: 'Salta',
      ciudades: ['Salta Capital', 'Cafayate']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Sofía',
    email: 'sofia_garcia@gmail.com',
    fechaNacimiento: new Date(2000, 7, 18),
    ciudad: 'La Plata',
    provincia: {
      id: 3,
      name: 'Buenos Aires',
      ciudades: ['La Plata', 'Mar del Plata']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Diego',
    email: 'diego_paz@hotmail.com',
    fechaNacimiento: new Date(1985, 11, 2),
    ciudad: 'Bariloche',
    provincia: {
      id: 6,
      name: 'Río Negro',
      ciudades: ['Bariloche', 'Viedma']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Marta',
    email: 'marta.lopez@gmail.com',
    fechaNacimiento: new Date(1998, 2, 11),
    ciudad: 'San Juan',
    provincia: {
      id: 7,
      name: 'San Juan',
      ciudades: ['San Juan Capital', 'Rivadavia']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Carlos',
    email: 'carlos.villa@yahoo.com',
    fechaNacimiento: new Date(1990, 10, 9),
    ciudad: 'Santa Rosa',
    provincia: {
      id: 8,
      name: 'La Pampa',
      ciudades: ['Santa Rosa', 'General Pico']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
    }
  },
  {
    nombre: 'Valentina',
    email: 'valentina.ramirez@mail.com',
    fechaNacimiento: new Date(2003, 1, 25),
    ciudad: 'Mendoza Capital',
    provincia: {
      id: 1,
      name: 'Mendoza',
      ciudades: ['Mendoza Capital', 'San Rafael']
    },
    pais: {
      id: 1,
      name: 'Argentina',
      provincias: []
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
    const confirmacion = window.confirm('Confirmas Guardar Persona?');

    if (!confirmacion) return;

    const fechaNacimiento = typeof persona.fechaNacimiento === 'string'
      ? toLocalDate(persona.fechaNacimiento)
      : persona.fechaNacimiento;
    // Agregar a la lista
    this.items.push({
      ...persona,
      fechaNacimiento: fechaNacimiento // Asegurar que es Date
    });
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
  eliminarPersona(){
    if(this.selectedItem){
      const confirmacion = window.confirm('¿Queres eliminar esta persona?');
      if (confirmacion) {
        this.items = this.items.filter(item => item !== this.selectedItem);
      
        // Actualizar lista filtrada
        this.filteredItems = [...this.items];

        // Limpiar la selección
        this.selectedItem = null;
      }
    }
  }
  modificarPersona(personaModificada: Persona) {
    if (!personaModificada || !this.selectedItem) return;
    
    const confirmacion = window.confirm('Confirmas los cambios?');

    if (!confirmacion) return;

    // Convertir fechaNacimiento a tipo Date si es string
    const fechaNacimiento = typeof personaModificada.fechaNacimiento === 'string'
      ? toLocalDate(personaModificada.fechaNacimiento)
      : personaModificada.fechaNacimiento;

    const index = this.items.indexOf(this.selectedItem);
    if (index !== -1) {
      this.items[index] = {
        ...personaModificada,
        fechaNacimiento: fechaNacimiento
      };
      this.items = [...this.items]; // ← Esto fuerza el refresh de Angular
      this.filteredItems = [...this.items];
      this.selectedItem = null;
      this.mostrarModalModificar = false;
    }
  }
  // getters y otros métodos igual que antes
  get totalPaginas(): number {
    return Math.ceil(this.filteredItems.length / this.elementosPorPagina);
  }

  get itemsPaginados(): Persona[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    return this.filteredItems.slice(inicio, inicio + this.elementosPorPagina);
  }
}