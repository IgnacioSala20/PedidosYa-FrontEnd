import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  constructor(
    private globalStatusService: GlobalStatusService, 
    public themeService: ThemeService,
    private route : Router
  ) {}
  menuOpen=false;
  showProfileMenu = false;
  
  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  logout() {
    // Aquí tu lógica para cerrar sesión
    console.log('Sesión cerrada');
    this.showProfileMenu = false;
    this.route.navigate(['/login'])
  }
  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }
  toggleDarkMode() {
    this.themeService.toggleDarkMode();
  }
  toggleMenu(){
    console.log("Click")
    this.menuOpen=!this.menuOpen;
  }
}
