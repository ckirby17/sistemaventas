using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface ICategoriaService
    {
        Task<List<CategoriaListarDto>> Listar();
        Task<CategoriaListarDto> Crear(CategoriaCrearDto modelo);
        Task<bool> Editar(CategoriaEditarDto modelo);
        Task<bool> Eliminar(int? categoriaId);
        Task<CategoriaListarDto?> Obtener(int Id);
    }
}
