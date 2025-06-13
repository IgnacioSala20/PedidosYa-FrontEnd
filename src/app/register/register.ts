import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Método para manejar el registro
  onSubmit() {
    // Lógica de registro aquí
    console.log('Formulario enviado');
    // this.router.navigate(['/dashboard']); // Redirigir después de registro exitoso
  }
}
