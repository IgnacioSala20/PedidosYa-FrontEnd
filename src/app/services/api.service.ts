import { Injectable } from '@angular/core';
import { config } from '../config/env';
import { Persona, PersonaCreateDTO } from '../interface/modales.dto';
import axiosService from '../../api/apiClient';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';
  constructor() {}

  async getData(): Promise<
    Array<{ name: string; description: string; image: string }>
  > {
      return (await axiosService.get(config.urls.getFood)).data
  }
  async crearPersona(persona: Persona) {
    return (await axiosService.post(config.urls.createPerson, persona)).data;
  }
  async modificarPersona(persona: Persona) {
    return (await axiosService.put(`${config.urls.modificarPersona}${persona.id}`, persona)).data;
  }
  async eliminarPersona(id: number) {
    return (await axiosService.delete(`${config.urls.eliminarPersona}${id}`)).data;
  }
  async getPersona() {
    return (await axiosService.get(config.urls.getPerson)).data
  }
  async getPais() {
    return (await axiosService.get(config.urls.getCountry)).data
  }
  async getCiudad() {
    return (await axiosService.get(config.urls.getCiudad)).data
  }
  async getPersonasPaginadas(page: number = 1, limit: number = 10): Promise<{ items: Persona[], meta: any }> {
    const response = await axiosService.get(`${config.urls.getPersonaPaginada}?page=${page}&limit=${limit}`);
    return response.data;
  } 
  async login(usuario: string, contraseña: string) {
    const response = await axiosService.post('http://localhost:3001/users/login', {
      password: contraseña,
      email: usuario,
    });
    const accessToken = response.data.accessToken;
    const refreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  async register(email:string, contraseña: string){
    await axiosService.post('http://localhost:3001/users/register', {
      password: contraseña,
      email: email,
    });
  }
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No hay refresh token disponible');
    }
    const response = await axiosService.post('http://localhost:3001/users/refresh-token', null, {
      headers: {
        'refresh-token': refreshToken,
      },
    });
    const accessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return { accessToken, newRefreshToken };
  }
}

