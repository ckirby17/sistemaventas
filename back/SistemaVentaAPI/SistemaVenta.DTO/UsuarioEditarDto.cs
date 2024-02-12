using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class UsuarioEditarDto
    {
        public int? Id { get; set; }

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

        [Required(ErrorMessage = "El campo Es Activo es requerido.")]
        public bool EsActivo { get; set; }
    }
}
