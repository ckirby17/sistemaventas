using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IRolService
    {
        Task<List<RolListarDto>> Listar();
        Task<RolListarDto> Crear(RolCrearDto modelo);
        Task<bool> Editar(RolEditarDto modelo);
        Task<bool> Eliminar(int? rolId);
        Task<RolListarDto?> Obtener(int Id);
    }
}
