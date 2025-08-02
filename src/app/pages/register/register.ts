import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formulario: FormGroup;
  error='';
  constructor(private router: Router, private fb: FormBuilder, private readonly apiService: ApiService) {
      this.formulario=this.fb.group({
      nombre: ['',[ Validators.required, Validators.maxLength(15)]],
      email: ['',[Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(7)]]
    })
  }

  goToLogin() {
    if(this.formulario.invalid){
      this.error="Completa todos los campos correctamente"
      return;
    }
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('contraseña')?.value;    
    const data= this.apiService.register(email,password);
    console.log(data)

    this.error='';
    this.router.navigate(['/login']);
  }
  
  enviarLogin(){
    this.router.navigate(['/login']);
  }
  onSubmit() {
  }
}
