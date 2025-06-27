import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Ciudad, Pais, Persona, Provincia } from '../../interface/modales.dto';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal-modificar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-modificar.html',
  styleUrls: ['./modal-modificar.css']
})
export class ModalModificar implements OnInit{
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
      paises: [null, [Validators.required]],
      provincias: [null, [Validators.required]],
      ciudades: [null, [Validators.required]]
    })
  }
  async ngOnInit(): Promise<void>{
    const data = await this.apiService.getCiudad();
    this.dataCiudades = data;
    this.paises = this.extraerPaisesUnicos(data);
  }
  @Input() mostrar = false;
  private _persona: Persona | null = null;

  @Input() set persona(value: Persona | null) {
    this._persona = value;
    if (value) {
      this.initFormulario(value);
    }
  }
  @Output() guardarPersona = new EventEmitter<Persona>();
  @Output() cerrarModal = new EventEmitter<void>();


  private initFormulario(persona: Persona) {
    const ciudad = this.dataCiudades.find(c => c.id === persona.ciudades?.id) || null;
    const provincia = ciudad?.provincias || null;
    const pais = this.paises.find(p => p.id === persona.ciudades?.provincias?.paises?.id) || null;

    this.provincias = this.extraerProvinciasUnicas(
      this.dataCiudades.filter(c => c.provincias.paises.id === pais?.id)
    );
    this.ciudades = this.dataCiudades.filter(c => c.provincias.id === provincia?.id);
    this.formulario.setValue({
      name: persona.name,
      email: persona.email,
      fechaNacimiento: persona.fechaNacimiento,
      paises: pais,           // un solo Pais
      provincias: provincia,  // un solo Provincia
      ciudades: ciudad       // un solo Ciudad
    });
  }

  onPaisChange() {
    const pais: Pais = this.formulario.get('paises')?.value;
    this.provincias = this.extraerProvinciasUnicas(
      this.dataCiudades.filter(c => c.provincias.paises.id === pais?.id)
    );
    this.ciudades = [];
    this.formulario.patchValue({
      provincias: null,
      ciudades: null
    });
  }

  onProvinciaChange() {
    const provincia: Provincia = this.formulario.get('provincias')?.value;
    this.ciudades = this.dataCiudades.filter(c => c.provincias.id === provincia?.id);
    this.formulario.patchValue({
      ciudades: null
    });
  }

  cerrar() {
    if (this._persona) {
      this.initFormulario(this._persona);//Restaura datos originales
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
    //Compara 2 provincias, una es la provincia que viene seleccionada es decir la que viene con la persona a modificar, y luego los otros son las
    //provincias que estan dentro de las option, para que cuando sean iguales los id,  sabemos que esa opcion se marca como selected, es decir se pone selected
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
  compareCiudad = (c1: Ciudad, c2: Ciudad): boolean => {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
