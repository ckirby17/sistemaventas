import { ProductoListar } from "./producto-listar";
import { VentaListar } from "./venta-listar";

export interface VentaDetalleListar {
    id: number,
    ventaId: number,
    productoId: number,
    cantidad: string,
    precio: string,
    total: string,
    descripcion: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    producto: ProductoListar,
    venta: VentaListar
}
