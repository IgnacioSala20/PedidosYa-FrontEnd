import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pais, Persona, Provincia } from '../../interface/modales.dto';
@Component({
  selector: 'app-modal-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-modificar.html',
  styleUrls: ['./modal-modificar.css']
})
export class ModalModificar{
  formulario: FormGroup;
  error = '';
  constructor(private fb: FormBuilder){
    this.formulario=this.fb.group({
      nombre: ['',[Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['',[Validators.required]],
      pais: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      ciudad: [null, [Validators.required]]
    })
  }
  @Input() mostrar = false;
  @Input() paises: Pais[] = [];

  private _persona: Persona | null = null;

  @Input() set persona(value: Persona | null) {
    this._persona = value;
    if (value) {
      this.initFormulario(value);
    }
  }

  @Output() guardarPersona = new EventEmitter<Persona>();
  @Output() cerrarModal = new EventEmitter<void>();

  provincias: Provincia[] = [];
  ciudades: string[] = [];

  private initFormulario(persona: Persona) {
    // Buscar país completo
    const pais = this.paises.find(p => p.id === persona.pais?.id) || null;
    const provincias = pais?.provincias || [];

    // Buscar provincia completa
    const provincia = provincias.find(prov => prov.id === persona.provincia?.id) || null;
    const ciudades = provincia?.ciudades || [];

    // Validar ciudad
    const ciudad = ciudades.includes(persona.ciudad || '') ? persona.ciudad : ciudades[0] || null;

    this.provincias = provincias;
    this.ciudades = ciudades;

    this.formulario.setValue({
      nombre: persona.nombre,
      email: persona.email,
      fechaNacimiento: persona.fechaNacimiento,
      pais: pais,
      provincia: provincia,
      ciudad: ciudad
    });
  }

  onPaisChange() {
    const pais: Pais = this.formulario.get('pais')?.value;
    this.provincias = pais?.provincias || [];
    this.ciudades = [];

    this.formulario.patchValue({
      provincia: null,
      ciudad: null
    });
  }

  onProvinciaChange() {
    const provincia: Provincia = this.formulario.get('provincia')?.value;
    this.ciudades = provincia?.ciudades || [];

    this.formulario.patchValue({
      ciudad: null
    });
  }

  cerrar() {
    if (this._persona) {
      this.initFormulario(this._persona); // Restaurar datos originales
    }

    this.cerrarModal.emit();
  }
  guardar() {
    if (this.formulario.invalid) {
      this.error = "Completa todos los campos correctamente.";
      return;
    }

    const persona: Persona = this.formulario.value;
    this.guardarPersona.emit(persona);
    this.cerrar();
  }

  compareProvincia(p1: Provincia | null, p2: Provincia | null): boolean {
    //Compara 2 provincias, una es la provincia que viene seleccionada
    //es decir la que viene con la persona a modificar, y luego los otros son las
    //provincias que estan dentro de las option, para que cuando sean iguales los id, 
    // sabemos que esa opcion se marca como selected, es decir se pone selected
    if (p1 && p2) {
      return p1.id === p2.id;
    }
    return p1 === p2;
  }

  comparePais(p1: Pais | null, p2: Pais | null): boolean {
    if (p1 && p2) {
      return p1.id===p2.id;
    }
    return p1 === p2;
  }

}
