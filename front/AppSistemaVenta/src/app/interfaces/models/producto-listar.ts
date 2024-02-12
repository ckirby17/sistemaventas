import { CategoriaListar } from "./categoria-listar";

export interface ProductoListar {
    id: number,
    nombre: string,
    categoriaId: number,
    categoriaNombre: string,
    precioCosto: string,
    precioVenta: string,
    stockMinimo: string,
    stockActual: string,
    esActivo: boolean,
    esActivoTexto: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    categoria: CategoriaListar
}
