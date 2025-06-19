import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formulario: FormGroup;
  error='';
  constructor(private router: Router,private fb: FormBuilder
  ){
    this.formulario=this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.maxLength(8)]]
    })
  }

  onLogin() {
    if(this.formulario.invalid){
      this.error="Completa todos los campos correctamente"
      return;
    }
    console.log(this.formulario.value)
    this.error='';
    this.router.navigate(['/home']); // Redirige al usuario a la página principal después de iniciar sesión
  }
  toggleRegister(){
    this.router.navigate(['/register']); // Redirige al usuario a la página de registro
  }
  goToCambio(){
    this.router.navigate(['/cambioContrasenia'])
  }

}
