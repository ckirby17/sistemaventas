using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface ITipoPagoService
    {
        Task<List<TipoPagoListarDto>> Listar();
        Task<TipoPagoListarDto> Crear(TipoPagoCrearDto modelo);
        Task<bool> Editar(TipoPagoEditarDto modelo);
        Task<bool> Eliminar(int? tipoPagoId);
        Task<TipoPagoListarDto?> Obtener(int Id);
    }
}