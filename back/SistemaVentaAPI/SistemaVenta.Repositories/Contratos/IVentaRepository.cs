using SistemaVenta.DB.Models;

namespace SistemaVenta.Repositories.Contratos
{
    public interface IVentaRepository: IGenericRepository<Venta>
    {
        Task<Venta> Registrar(Venta modelo);
    }
}
