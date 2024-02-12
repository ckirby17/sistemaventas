import { RolListar } from "../models/rol-listar";

export interface SessionUsuario {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    token: string,
    rol: RolListar
}