import { VentaDetalleCrear } from "./venta-detalle-crear";

export interface VentaCrear {
    neto: string,
    iva: string,
    total: string,
    tipoPagoId: number,
    tipoDocumentoId: number,
    ventaDetalles: VentaDetalleCrear[];
}
