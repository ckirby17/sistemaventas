using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class ProductoListarDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        public int? CategoriaId { get; set; }

        public string? CategoriaNombre { get; set; }

        public string? PrecioCosto { get; set; }

        public string? PrecioVenta { get; set; }

        public string? StockMinimo { get; set; }

        public string? StockActual { get; set; }

        public bool EsActivo { get; set; }

        public string? EsActivoTexto { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }

        public virtual CategoriaListarDto? Categoria { get; set; }
    }
}