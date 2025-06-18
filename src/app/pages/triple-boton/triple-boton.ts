import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-triple-boton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './triple-boton.html',
  styleUrl: './triple-boton.css'
})
export class TripleBoton {
  @Input() nombre: string ='';
  @Output() agregar = new EventEmitter<void>();
  @Output() modificar = new EventEmitter<void>();
  @Output() eliminar = new EventEmitter<void>();

  onAgregar() {
    this.agregar.emit();
  }

  onModificar() {
    this.modificar.emit();
  }

  onEliminar() {
    this.eliminar.emit();
  }
}
