import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalAgregar } from '../modal-agregar/modal-agregar';
import { ModalModificar } from '../modal-modificar/modal-modificar';
import { Paginacion } from '../paginacion/paginacion';
import { TripleBoton } from '../triple-boton/triple-boton';
import { Pais, Persona } from '../../interface/modales.dto';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalAgregar, ModalModificar,Paginacion, TripleBoton],
  templateUrl: './tabla.html',
  styleUrls: ['./tabla.css']
})
export class Tabla implements OnInit{
  items: Persona[] = [];
  meta: any = null;

  constructor(public themeService: ThemeService, private readonly apiService: ApiService) {}
  
  
  paises: Pais[] = [];
  async ngOnInit(): Promise<void> {
    await this.cargarPersonas();
    const dataCiudades = await this.apiService.getCiudad();
    this.paises = dataCiudades;
  }
  async cargarPersonas(): Promise<void> {
    const response = await this.apiService.getPersonasPaginadas(this.paginaActual, this.elementosPorPagina);
    this.items = response.items;
    this.meta = response.meta; // info como totalItems, totalPages, etc.
  }
  searchTerm = '';
  mostrarModal = false;
  selectedItem: Persona | null = null;
  mostrarModalModificar = false;
  paginaActual: number = 1;
  elementosPorPagina: number = 9;
  filteredItems: Persona[] = [];
  filterItems() {
    if (!this.searchTerm) {
      this.filteredItems = [...this.items];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.ciudades?.name.toLowerCase().includes(term) ||
      item.ciudades?.provincias?.name.toLowerCase().includes(term) ||
      item.ciudades?.provincias?.paises?.name.toLowerCase().includes(term)
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

  async agregarPersona(persona: Persona) {
    if (!persona.name || !persona.email || !persona.fechaNacimiento) {
      return;
    }
    const confirmacion = window.confirm('¿Confirmás guardar la persona?');
    if (!confirmacion) return;
    if (!persona.ciudades || !persona.ciudades.id) {
      return;
    }
    const nuevaPersona = await this.apiService.crearPersona(persona);
    this.items.push(nuevaPersona);
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
  async eliminarPersona() {
    if(this.selectedItem){
      const confirmacion = window.confirm('¿Queres eliminar esta persona?');
      if (confirmacion) {
        await this.apiService.eliminarPersona(this.selectedItem.id);
        this.items = this.items.filter(item => item !== this.selectedItem);
        this.selectedItem = null;
      }
    }
  }
  async modificarPersona(personaModificada: Persona) {
    if (!personaModificada || !this.selectedItem) return;
      const confirmacion = window.confirm('Confirmas los cambios?');
      if (!confirmacion) return;
      if (!personaModificada.name || !personaModificada.email || !personaModificada.fechaNacimiento) {
        console.error('Datos incompletos');
        return;
      }
      try {
        const personaConId = { ...personaModificada, id: this.selectedItem.id };
        const personaActualizada = await this.apiService.modificarPersona(personaConId);
        const index = this.items.indexOf(this.selectedItem);
        if (index !== -1) {
          this.items[index] = {...personaActualizada};
          this.items = [...this.items];
          this.selectedItem = null;
          this.mostrarModalModificar = false;
        }
      } catch (error) {
        console.error('Error al modificar persona:', error);
        alert('No se pudo modificar la persona. Intente nuevamente.');
      }
  }
  onPaginaCambiada(nuevaPagina: number) {
    this.paginaActual = nuevaPagina;
    this.cargarPersonas();
  }
  get itemsPaginados(): Persona[] {
    return this.items; // así aplicás búsqueda + paginación si querés más adelante
  }
}