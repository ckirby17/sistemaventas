using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface ISubMenuService
    {
        Task<List<SubMenuListarDto>> Listar();
        Task<SubMenuListarDto> Crear(SubMenuCrearDto modelo);
        Task<bool> Editar(SubMenuEditarDto modelo);
        Task<bool> Eliminar(int? subMenuId);
        Task<SubMenuListarDto?> Obtener(int Id);
    }
}