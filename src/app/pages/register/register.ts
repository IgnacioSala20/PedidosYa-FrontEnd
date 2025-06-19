import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formulario: FormGroup;
  error='';
  constructor(private router: Router, private fb: FormBuilder) {
      this.formulario=this.fb.group({
      nombre: ['', Validators.required, Validators.maxLength(15)],
      email: ['',[Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.maxLength(8)]]
    })
  }

  goToLogin() {
    if(this.formulario.invalid){
      this.error="Completa todos los campos correctamente"
      return;
    }
    console.log(this.formulario.value)
    this.error='';
    this.router.navigate(['/login']);
  }
  
  enviarLogin(){
    this.router.navigate(['/login']);
  }
  onSubmit() {
  }
}
