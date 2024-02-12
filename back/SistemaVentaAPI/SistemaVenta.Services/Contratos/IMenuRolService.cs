using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IMenuRolService
    {
        Task<List<MenuRolListarDto>> Listar();
        Task<MenuRolListarDto> Crear(MenuRolCrearDto modelo);
        Task<bool> Editar(MenuRolEditarDto modelo);
        Task<bool> Eliminar(int? menuRolId);
        Task<MenuRolListarDto?> Obtener(int Id);
        Task<List<MenuRolListarDto>> ObtenerMenusPorRol(int rolId);
        Task<bool> RegistrarRolMenus(List<MenuRolCrearDto> listaModeloDto);
    }
}