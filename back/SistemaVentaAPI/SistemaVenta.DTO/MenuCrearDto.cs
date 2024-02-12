using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class MenuCrearDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Icono { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Url { get; set; }

        public int Orden { get; set; }
    }
}
