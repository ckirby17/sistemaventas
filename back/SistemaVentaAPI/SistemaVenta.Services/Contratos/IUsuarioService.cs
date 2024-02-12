using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IUsuarioService
    {
        Task<List<UsuarioListarDto>> Listar();
        Task<UsuarioListarDto> Crear(UsuarioCrearDto modelo);
        Task<bool> Editar(UsuarioEditarDto modelo);
        Task<bool> Eliminar(int? usuarioId);
        Task<UsuarioListarDto?> Obtener(int Id);
        Task<SessionUsuarioDto?> ValidarCredencial(LoginDto modelo);
    }
}