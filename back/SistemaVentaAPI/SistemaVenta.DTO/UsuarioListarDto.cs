using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class UsuarioListarDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Apellido { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Correo { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Clave { get; set; }

        public bool EsActivo { get; set; }

        public string? EsActivoTexto { get; set; }

        public int RolId { get; set; }

        public string? RolNombre { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }

        public virtual RolListarDto? Rol { get; set; }
    }
}