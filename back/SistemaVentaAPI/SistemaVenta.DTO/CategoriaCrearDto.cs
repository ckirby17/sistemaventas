using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class CategoriaCrearDto
    {
        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        public bool EsActivo { get; set; }
    }
}