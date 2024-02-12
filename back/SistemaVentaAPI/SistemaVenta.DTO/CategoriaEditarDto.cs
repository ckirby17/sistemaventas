using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class CategoriaEditarDto
    {
        public int? Id { get; set; } = null!;

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }
        public bool EsActivo { get; set; }
    }
}