import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ciudad, Pais, Persona, Provincia } from '../../interface/modales.dto';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-agregar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-agregar.html',
  styleUrl: './modal-agregar.css'
})
export class ModalAgregar  implements OnInit{
  formulario: FormGroup;
  error = '';
  ciudades: Ciudad[] = [];
  dataCiudades: Ciudad[] = [];
  provincias: Provincia[] = [];
  paises: Pais[] = [];
  constructor(private fb: FormBuilder, private readonly apiService: ApiService){
    this.formulario=this.fb.group({
      name: ['',[Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['',[Validators.required]],
      pais: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      ciudades: [null, [Validators.required]]
    })
  }
  async ngOnInit(): Promise<void>{
    const data = await this.apiService.getCiudad();
    this.dataCiudades = data;
    this.paises = this.extraerPaisesUnicos(data);
  }
  @Input() mostrar: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() guardarPersona = new EventEmitter<Persona>();

  cerrar() {
    this.cerrarModal.emit();
    this.formulario.reset();
    this.provincias = [];
    this.ciudades = [];
  }
  agregarPersona() {
    if (this.formulario.invalid) {
      this.error="Completa todos los campos correctamente."
      return;
    }
    const persona: Persona = this.formulario.value;
    this.guardarPersona.emit(persona);
    this.formulario.reset();
    this.provincias = [];
    this.ciudades = [];
    this.cerrar();
  }

  onPaisChange() {
    const pais: Pais = this.formulario.get('pais')?.value;
    this.provincias = this.extraerProvinciasUnicas(
      this.dataCiudades.filter(c => c.provincias.paises.id === pais?.id)
    );
    this.ciudades = [];
    this.formulario.patchValue({
      provincia: null,
      ciudades: null
    });
  }

  onProvinciaChange() {
    const provincia: Provincia = this.formulario.get('provincia')?.value;
    this.ciudades = this.dataCiudades.filter(c => c.provincias.id === provincia?.id);
    this.formulario.patchValue({
      ciudades: null
    });
  }
  extraerProvinciasUnicas(ciudades: Ciudad[]): Provincia[] {
    const mapa = new Map<number, Provincia>();
    for (const ciudad of ciudades) {
      const prov = ciudad.provincias;
      if (!mapa.has(prov.id)) {
        mapa.set(prov.id, prov);
      }
    }
    return Array.from(mapa.values());
  }

  extraerPaisesUnicos(ciudades: Ciudad[]): Pais[] {
    const mapa = new Map<number, Pais>();
    for (const ciudad of ciudades) {
      const pais = ciudad.provincias.paises;
      if (!mapa.has(pais.id)) {
        mapa.set(pais.id, pais);
      }
    }
    return Array.from(mapa.values());
  }
}