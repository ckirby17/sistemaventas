using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class VentaCrearDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string? Neto { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string? Iva { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string? Total { get; set; }

        [Required(ErrorMessage = "El campo Tipo Pago es requerido")]
        public int? TipoPagoId { get; set; }

        [Required(ErrorMessage = "El campo Tipo Documento es requerido")]
        public int? TipoDocumentoId { get; set; }

        [Required(ErrorMessage = "El listado Detalle de Ventas es requerido")]
        public virtual ICollection<VentaDetalleCrearDto>? VentaDetalles { get; set; } = new List<VentaDetalleCrearDto>();
    }
}