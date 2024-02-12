using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class ProductoEditarDto
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo Categoría es requerido.")]
        public int? CategoriaId { get; set; }

        [Required(ErrorMessage = "El campo Precio Costo es requerido.")]
        public string PrecioCosto { get; set; }

        [Required(ErrorMessage = "El campo Precio Venta es requerido.")]
        public string? PrecioVenta { get; set; }

        [Required(ErrorMessage = "El campo Stock Mínimo es requerido.")]
        public string? StockMinimo { get; set; }

        [Required(ErrorMessage = "El campo Stock Actual es requerido.")]
        public string? StockActual { get; set; }

        public bool EsActivo { get; set; }
    }
}