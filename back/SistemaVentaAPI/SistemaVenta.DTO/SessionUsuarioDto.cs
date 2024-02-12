namespace SistemaVenta.DTO
{
    public class SessionUsuarioDto
    {
        public int Id { get; set; }

        public string? Nombre { get; set; }

        public string? Apellido { get; set; }

        public string? Correo { get; set; }

        public string? Token {  get; set; }

        public virtual RolListarDto? Rol { get; set; }
    }
}