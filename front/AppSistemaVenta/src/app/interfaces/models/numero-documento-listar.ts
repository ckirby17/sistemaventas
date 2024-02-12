import { TipoDocumentoListar } from "./tipo-documento-listar";

export interface NumeroDocumentoListar {
    id: number,
    ultimoNumero: number,
    tipoDocumentoId: number
    fechaCreacion: Date,
    fechaActualizacion: Date,
    tipoDocumento: TipoDocumentoListar
}
