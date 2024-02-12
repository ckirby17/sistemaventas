using System.ComponentModel.DataAnnotations;

namespace SistemaVenta.DTO
{
    public class TipoDocumentoListarDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Nombre { get; set; }

        [Required(ErrorMessage = "El campo {0} es requerido.")]
        public string? Sigla { get; set; }

        public bool EsActivo { get; set; }

        public string? EsActivoTexto { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }
    }
}