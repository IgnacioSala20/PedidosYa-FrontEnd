import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacion',
  imports: [],
  standalone: true,
  templateUrl: './paginacion.html',
  styleUrl: './paginacion.css'
})
export class Paginacion {
    //Esto es para que le muestre al padre
  @Input() paginaActual: number = 1;
  @Input() totalPaginas: number = 2;

  @Output() paginaActualChange = new EventEmitter<number>();

  irPrimeraPagina() {
    this.paginaActualChange.emit(1);
  }

  retrocederPagina() {
    if (this.paginaActual > 1) {
      this.paginaActualChange.emit(this.paginaActual - 1);
    }
  }

  avanzarPagina() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActualChange.emit(this.paginaActual + 1);
    }
  }

  irUltimaPagina() {
    this.paginaActualChange.emit(this.totalPaginas);
  }
}
