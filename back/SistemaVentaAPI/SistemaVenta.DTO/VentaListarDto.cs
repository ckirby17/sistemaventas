namespace SistemaVenta.DTO
{
    public class VentaListarDto
    {
        public long Id { get; set; }

        public string? Neto { get; set; }

        public string? Iva { get; set; }

        public string? Total { get; set; }

        public string? NumeroDocumento { get; set; }

        public int? TipoPagoId { get; set; }

        public string? TipoPagoNombre { get; set; }

        public string? TipoPagoSigla { get; set; }

        public int? TipoDocumentoId { get; set; }

        public string? TipoDocumentoNombre { get; set; }

        public string? TipoDocumentoSigla { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }

        public virtual TipoDocumentoListarDto? TipoDocumento { get; set; }

        public virtual TipoPagoListarDto? TipoPago { get; set; }

        public virtual ICollection<VentaDetalleListarDto>? VentaDetalles { get; set; } = new List<VentaDetalleListarDto>();
    }
}
