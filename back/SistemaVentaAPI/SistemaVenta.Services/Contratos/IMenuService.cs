using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IMenuService
    {
        Task<List<MenuListarDto>> Listar();
        Task<MenuListarDto> Crear(MenuCrearDto modelo);
        Task<bool> Editar(MenuEditarDto modelo);
        Task<bool> Eliminar(int? menuId);
        Task<MenuListarDto?> Obtener(int Id);
    }
}
