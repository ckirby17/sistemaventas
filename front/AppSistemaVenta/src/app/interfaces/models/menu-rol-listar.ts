import { MenuListar } from "./menu-listar";
import { RolListar } from "./rol-listar";

export interface MenuRolListar {
    id: number,
    menuId: number,
    rolId: number,
    fechaCreacion: string,
    fechaActualizacion: string,
    menu: MenuListar,
    rol: RolListar
}
