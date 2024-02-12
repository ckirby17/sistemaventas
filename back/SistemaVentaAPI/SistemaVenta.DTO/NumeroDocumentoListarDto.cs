namespace SistemaVenta.DTO
{
    public class NumeroDocumentoListarDto
    {
        public int Id { get; set; }

        public long UltimoNumero { get; set; }

        public int? TipoDocumentoId { get; set; }

        public DateTime FechaCreacion { get; set; }

        public DateTime? FechaActualizacion { get; set; }

        public virtual TipoDocumentoListarDto? TipoDocumento { get; set; }
    }
}
