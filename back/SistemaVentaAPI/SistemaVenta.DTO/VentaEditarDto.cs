using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class VentaEditarDto
    {
        public long? Id { get; set; }

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
    }
}
