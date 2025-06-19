export interface Provincia {
    id: number;
    name: string;
    ciudades: string[];
}

export interface Pais {
    id: number;
    name: string;
    provincias: Provincia[];
}

export interface Persona {
    nombre: string;
    email: string;
    fechaNacimiento: string;
    ciudad: string | null;
    provincia: Provincia | null;
    pais: Pais | null;
}