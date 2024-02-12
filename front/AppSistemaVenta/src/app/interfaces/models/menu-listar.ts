import { SubMenuListar } from "./sub-menu-listar";

export interface MenuListar {
    id: number,
    nombre: string,
    icono: string,
    url: string,
    orden: number,
    fechaCreacion: string,
    fechaActualizacion: string,
    seleccionado: boolean,
    subMenus: SubMenuListar[]
}
