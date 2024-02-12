namespace SistemaVenta.DTO
{
    public class MenuListarDto
    {
        public int Id { get; set; }
        public string? Nombre { get; set; }
        public string? Icono { get; set; }
        public string? Url { get; set; }
        public int Orden { get; set; }
        public string? FechaCreacion { get; set; }
        public string? FechaActualizacion { get; set; }
        public virtual ICollection<SubMenuListarDto>? SubMenus { get; set; } = new List<SubMenuListarDto>();
    }
}
