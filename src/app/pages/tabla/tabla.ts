import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAgregar } from '../modal-agregar/modal-agregar';
import { ModalModificar } from '../modal-modificar/modal-modificar';
import { Paginacion } from '../paginacion/paginacion';
import { TripleBoton } from '../triple-boton/triple-boton';
import { Pais, Persona } from '../../interface/modales.dto';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAgregar, ModalModificar,Paginacion, TripleBoton, HttpClientModule],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Tabla implements OnInit {
  ngOnInit() {
    this.getPersonas();
    this.getPaises();
  }

  searchTerm = '';
  mostrarModal = false;
  selectedItem: Persona | null = null;
  
  mostrarModalModificar = false;
  
  paginaActual: number = 1;
  elementosPorPagina: number = 2;
  
  items: Persona[] = [];
  paises: Pais[] = [];
  async getPersonas() {
    try {
      const response = await this.http.get<Persona[]>('http://localhost:3000/person').toPromise();
      this.items = response || [];
      console.log('Personas obtenidas:', this.items);
    } catch (error) {
      console.error('Error personas:', error);
    }
  }  
  async getPaises() {
    try {
      const response = await this.http.get<Pais[]>('http://localhost:3000/country').toPromise();
      this.paises = response || [];
    } catch (error) {
      console.error('Error paises:', error);
    }
  } 
  filteredItems: Persona[] = [...this.items];
  
  constructor(public themeService: ThemeService, private http: HttpClient) {
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