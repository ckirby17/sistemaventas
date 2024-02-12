namespace SistemaVenta.DTO
{
    public class MenuRolListarDto
    {
        public int Id { get; set; }

        public int MenuId { get; set; }

        public int RolId { get; set; }

        public string? FechaCreacion { get; set; }

        public string? FechaActualizacion { get; set; }

        public virtual MenuListarDto? Menu { get; set; }

        public virtual RolListarDto? Rol { get; set; }
    }
}
