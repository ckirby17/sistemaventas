using SistemaVenta.DTO;

namespace SistemaVenta.Services.Contratos
{
    public interface ITipoDocumentoService
    {
        Task<List<TipoDocumentoListarDto>> Listar();
        Task<TipoDocumentoListarDto> Crear(TipoDocumentoCrearDto modelo);
        Task<bool> Editar(TipoDocumentoEditarDto modelo);
        Task<bool> Eliminar(int? tipoDocId);
        Task<TipoDocumentoListarDto?> Obtener(int Id);
    }
}
