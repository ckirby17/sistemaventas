using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface IVentaService
    {
        Task<List<VentaListarDto>> Listar();
        Task<VentaListarDto> Registrar(VentaCrearDto modelo);
        Task<bool> Editar(VentaEditarDto modelo);
        Task<bool> Eliminar(long? ventaId);
        Task<VentaListarDto?> Obtener(long Id);
        Task<List<VentaListarDto>> ObtenerHistorial(HistorialVentaDto modeloDto);
    }
}
