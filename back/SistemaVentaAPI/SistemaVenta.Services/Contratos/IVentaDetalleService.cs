using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IVentaDetalleService
    {
        Task<List<VentaDetalleListarDto>> Listar();
        Task<VentaDetalleListarDto> Crear(VentaDetalleCrearDto modelo);
        Task<bool> Editar(VentaDetalleEditarDto modelo);
        Task<bool> Eliminar(long? detalleVtaId);
        Task<VentaDetalleListarDto?> Obtener(long Id);
        Task<List<VentaDetalleListarDto>> ListarPorVenta(long ventaId);
    }
}
