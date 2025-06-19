import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasenia',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './cambio-contrasenia.html',
  styleUrl: './cambio-contrasenia.css'
})
export class CambioContrasenia {
  formulario: FormGroup;
  error='';
  constructor(private route: Router, private fb: FormBuilder) {
    this.formulario= this.fb.group({
      contraActual: ['', [Validators.required, Validators.minLength(8)]],
      contraNueva: ['', [Validators.required, Validators.minLength(8)]],
      confirmacionContraNueva: ['', [Validators.required, Validators.minLength(8)]],
    },{
      validators: this.contrasIgualesValidator
    })
  }
  contrasIgualesValidator(group: FormGroup) {
    const nueva = group.get('contraNueva')?.value;
    const confirm = group.get('confirmacionContraNueva')?.value;
    return nueva === confirm ? null : { noCoinciden: true };
  }

  enviar(){
    if (this.formulario.invalid){
      this.error = 'Completa todos los campos correctamente.';
      return;
    }
    console.log(this.formulario.value);
    this.error='';
    this.goToLogin();
  }
  goToLogin(){
    this.route.navigate(['/login'])
  }
}
