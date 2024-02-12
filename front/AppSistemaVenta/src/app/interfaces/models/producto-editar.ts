export interface ProductoEditar {
    id: number,
    nombre: string,
    categoriaId: number,
    precioCosto: string,
    precioVenta: string,
    stockMinimo: string,
    stockActual: string,
    esActivo: boolean
}
