export interface VentaEditar {
    id: number,
    neto: number,
    iva: number,
    total: number,
    numeroDocumento?: number,
    tipoPagoId: number,
    tipoDocumentoId: number
}
