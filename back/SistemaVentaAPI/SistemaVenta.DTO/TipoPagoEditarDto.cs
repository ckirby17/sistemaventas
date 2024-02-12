using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class TipoPagoEditarDto
    {
        public int? Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Sigla { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public bool? EsActivo { get; set; }
    }
}
