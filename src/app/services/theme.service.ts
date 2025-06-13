// src/app/services/theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
    })
    export class ThemeService {
    private darkMode = false;

    constructor() {
        // Verificar preferencias del sistema o localStorage al iniciar
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme) {
        this.darkMode = savedTheme === 'true';
        } else {
        this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        this.applyTheme();
    }

    toggleDarkMode(): void {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode.toString());
        this.applyTheme();
    }

    isDarkMode(): boolean {
        return this.darkMode;
    }

    private applyTheme(): void {
        if (this.darkMode) {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }
}