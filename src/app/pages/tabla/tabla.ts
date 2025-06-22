import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAgregar } from '../modal-agregar/modal-agregar';
import { ModalModificar } from '../modal-modificar/modal-modificar';
import { Paginacion } from '../paginacion/paginacion';
import { TripleBoton } from '../triple-boton/triple-boton';
import { Pais, Persona } from '../../interface/modales.dto';


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
    fechaNacimiento: '2002-12-20',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '1995-05-14',
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
    fechaNacimiento: '',
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
  formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  abrirModal() {
    this.nuevaPersona = {
      nombre: '',
      email: '',
      fechaNacimiento: '',
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
    if (!persona.nombre || !persona.email || !persona.fechaNacimiento) {
      console.error('Datos incompletos');
      return;
    }
    const confirmacion = window.confirm('Confirmas Guardar Persona?');
    if (!confirmacion) return;

    this.items.push({...persona});
    this.filteredItems = [...this.items];
    this.mostrarModal = false;
    this.searchTerm = '';
    this.filterItems();
  }

  seleccionarFila(item: Persona) {
    this.selectedItem = this.selectedItem === item ? null : item;
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
        this.filteredItems = [...this.items];
        this.selectedItem = null;
      }
    }
  }
  modificarPersona(personaModificada: Persona) {
    if (!personaModificada || !this.selectedItem) return;
    const confirmacion = window.confirm('Confirmas los cambios?');
    if (!confirmacion) return;
    const index = this.items.indexOf(this.selectedItem);
    if (index !== -1) {
      this.items[index] = {...personaModificada};
      this.items = [...this.items];
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