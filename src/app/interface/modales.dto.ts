export interface Persona {
    id: number;
    name: string;
    email: string;
    fechaNacimiento: string;
    ciudades: Ciudad;
    deletedAt: string | null;
}

export interface Ciudad {
    id: number;
    name: string;
    provincias: Provincia;
    deletedAt: string | null;
}

export interface Provincia {
    id: number;
    name: string;
    paises: Pais;
    deletedAt: string | null;
}

export interface Pais {
    id: number;
    name: string;
    deletedAt: string | null;
}

export interface PersonaCreateDTO {
  name: string;
  email: string;
  fechaNacimiento: string; // idealmente en formato 'YYYY-MM-DD'
  ciudades: { id: number };   // objeto que contiene solo el id de la ciudad
}