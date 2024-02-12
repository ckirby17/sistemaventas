import { MenuListar } from "./menu-listar";

export interface SubMenuListar {
  id: number,
  menuId: number,
  menuNombre: string,
  nombre: string,
  icono: string,
  url: string,
  nivel: number,
  orden: number,
  fechaCreacion: string,
  fechaActualizacion: string,
  menu: MenuListar
}
