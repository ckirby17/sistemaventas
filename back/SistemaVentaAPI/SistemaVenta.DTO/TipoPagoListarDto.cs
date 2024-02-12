namespace SistemaVenta.DTO
{
    public class TipoPagoListarDto
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Sigla { get; set; }
        public bool EsActivo { get; set; }
        public string? EsActivoTexto { get; set; }
        public string? FechaCreacion { get; set; }
        public string? FechaActualizacion { get; set; }
    }
}