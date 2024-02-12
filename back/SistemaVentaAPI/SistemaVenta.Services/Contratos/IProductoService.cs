using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IProductoService
    {
        Task<List<ProductoListarDto>> Listar();
        Task<ProductoListarDto> Crear(ProductoCrearDto modelo);
        Task<bool> Editar(ProductoEditarDto modelo);
        Task<bool> Eliminar(int? productoId);
        Task<ProductoListarDto?> Obtener(int Id);
    }
}