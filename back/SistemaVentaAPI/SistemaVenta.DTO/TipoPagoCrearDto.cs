using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class TipoPagoCrearDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Sigla { get; set; }

        public bool EsActivo { get; set; }
    }
}
