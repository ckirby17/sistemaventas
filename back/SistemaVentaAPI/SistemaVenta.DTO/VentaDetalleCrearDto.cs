using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class VentaDetalleCrearDto
    {
        public long? VentaId { get; set; }

        [Required(ErrorMessage = "El campo Producto es requerido.")]
        public int? ProductoId { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [Range(1, int.MaxValue, ErrorMessage = "El valor de {0} debe ser mayor a 0")]
        public int Cantidad { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Precio { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Total { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Descripcion { get; set; }
    }
}
