﻿namespace SistemaVenta.DTO
{
    public class CategoriaListarDto
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public bool EsActivo { get; set; }
        public string? EsActivoTexto { get; set; }
        public string? FechaCreacion { get; set; }
        public string? FechaActualizacion { get; set; }
        public virtual ICollection<ProductoListarDto>? Productos { get; set; } = new List<ProductoListarDto>();
    }
}