import { ProductoListar } from "./producto-listar";

export interface CategoriaListar {
    id: number,
    nombre: string,
    esActivo: boolean,
    esActivoTexto: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    productos: ProductoListar[];
}
