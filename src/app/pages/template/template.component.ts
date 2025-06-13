import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  constructor(private globalStatusService: GlobalStatusService, public themeService: ThemeService) {}
  menuOpen=false;
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
