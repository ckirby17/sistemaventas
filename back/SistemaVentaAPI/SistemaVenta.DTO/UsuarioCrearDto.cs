using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class UsuarioCrearDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Apellido { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        [EmailAddress(ErrorMessage = "El formato del {0} es incorrecto.")]
        public string? Correo { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Clave { get; set; }

        [Required(ErrorMessage = "El campo Rol es requerido.")]
        public int RolId { get; set; }
    }
}