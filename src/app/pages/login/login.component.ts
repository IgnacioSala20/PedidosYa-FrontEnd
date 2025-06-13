import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router){}


  onLogin() {
    this.router.navigate(['/']); // Redirige al usuario a la página principal después de iniciar sesión
  }
  toggleRegister(){
    this.router.navigate(['/register']); // Redirige al usuario a la página de registro
  }

}
