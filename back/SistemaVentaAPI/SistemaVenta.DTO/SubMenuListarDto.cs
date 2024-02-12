namespace SistemaVenta.DTO
{
    public class SubMenuListarDto
    {
        public int Id { get; set; }

        public int MenuId { get; set; }

        public string? Nombre { get; set; }

        public string? Icono { get; set; }

        public string? Url { get; set; }

        public int Nivel { get; set; }

        public int Orden { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }

        public string? MenuNombre { get; set; }

        public virtual MenuListarDto? Menu { get; set; }
    }
}
