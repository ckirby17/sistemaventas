namespace SistemaVenta.DTO
{
    public class VentaDetalleListarDto
    {
        public long Id { get; set; }
        public long? VentaId { get; set; }
        public int? ProductoId { get; set; }
        public int Cantidad { get; set; }
        public string? Precio { get; set; }
        public string? Total { get; set; }
        public string? Descripcion { get; set; }
        public string? FechaCreacion { get; set; }
        public string? FechaActualizacion { get; set; }
        public virtual ProductoListarDto? Producto { get; set; }
        public virtual VentaListarDto? Venta { get; set; }
    }
}
