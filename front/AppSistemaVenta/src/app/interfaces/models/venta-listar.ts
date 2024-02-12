import { TipoDocumentoListar } from "./tipo-documento-listar";
import { TipoPagoListar } from "./tipo-pago-listar";
import { VentaDetalleListar } from "./venta-detalle-listar";

export interface VentaListar {
    id: number,
    neto: string,
    iva: string,
    total: string,
    numeroDocumento: string,
    tipoPagoId: number,
    tipoPagoNombre: string,
    tipoPagoSigla: string,
    tipoDocumentoId: number,
    tipoDocumentoNombre: string,
    tipoDocumentoSigla: string,
    fechaCreacion: string,
    fechaActualizacion: string,
    tipoDocumento: TipoDocumentoListar,
    tipoPago: TipoPagoListar,
    ventaDetalles: VentaDetalleListar[]
}
