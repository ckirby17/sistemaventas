using SistemaVenta.DB.Models;

namespace SistemaVenta.Repositories.Contratos
{
    public interface IMenuRolRepository : IGenericRepository<MenuRol>
    {
        Task<bool> Registrar(List<MenuRol> listaModelo, int rolId);
    }
}
