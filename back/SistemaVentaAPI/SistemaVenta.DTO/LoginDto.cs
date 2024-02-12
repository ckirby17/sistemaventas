using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class LoginDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [EmailAddress(ErrorMessage = "El campo {0} no posee el formato correcto.")]
        public string? Correo { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Clave { get; set; }
    }
}
