import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  formulario: FormGroup;
  error='';
  constructor(private router: Router,private fb: FormBuilder, private readonly apiService:ApiService
  ){
    this.formulario=this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(7)]]
    })
  }
  ngOnInit() {
    this.formulario.reset();
  }
  async onLogin() {
    if(this.formulario.invalid){
      this.error = "Completa todos los campos correctamente";
      return;
    }
    const email = this.formulario.get('email')?.value;
    const password = this.formulario.get('contraseña')?.value;

    try {
      const data = await this.apiService.login(email, password);
      console.log(data);
      this.error = '';
      this.router.navigate(['/home']);
    } catch (err) {
      this.error = 'Error en login, verifica tus datos';
    }
  }
  toggleRegister(){
    this.router.navigate(['/register']);
  }
  goToCambio(){
    this.router.navigate(['/cambioContrasenia'])
  }

}
