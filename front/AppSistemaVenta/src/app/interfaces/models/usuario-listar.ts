import { RolListar } from "./rol-listar";

export interface UsuarioListar {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    clave: string,
    rolId: number,
    rolNombre: string,
    esActivo: boolean,
    esActivoTexto: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    rol: RolListar
}
