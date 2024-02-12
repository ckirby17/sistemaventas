using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class SubMenuCrearDto
    {
        [Required(ErrorMessage = "El campo Menu es requerido")]
        public int MenuId { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe contener un máximo de 50 caracteres")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe contener un máximo de 50 caracteres")]
        public string? Icono { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido")]
        [MaxLength(50, ErrorMessage = "El campo {0} debe contener un máximo de 50 caracteres")]
        public string? Url { get; set; }

        public int Nivel { get; set; }

        public int Orden { get; set; }
    }
}
