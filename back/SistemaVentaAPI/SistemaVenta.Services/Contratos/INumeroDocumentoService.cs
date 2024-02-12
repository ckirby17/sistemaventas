using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface INumeroDocumentoService
    {
        Task<List<NumeroDocumentoListarDto>> Listar();
        Task<NumeroDocumentoListarDto> Crear(NumeroDocumentoCrearDto modelo);
        Task<bool> Editar(NumeroDocumentoEditarDto modelo);
        Task<bool> Eliminar(int? numeroDocId);
        Task<NumeroDocumentoListarDto?> Obtener(int Id);
    }
}
