using SistemaVenta.DB.Models;
using SistemaVenta.Repositories.Contratos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SistemaVenta.Repositories
{
    public class MenuRolRepository : GenericRepository<MenuRol>, IMenuRolRepository
    {
        private readonly SistemaVentasContext _context;

        public MenuRolRepository(SistemaVentasContext context) : base(context)
        {
            _context = context;
        }

        public async Task<bool> Registrar(List<MenuRol> listaModelo, int rolId)
        {
            try
            {
                var listaModeloDbPorRol = _context.MenuRols.Where(x => x.RolId == rolId);

                using (var transaccion = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        if (listaModeloDbPorRol != null)
                        {
                            _context.MenuRols.RemoveRange(listaModeloDbPorRol);
                            await _context.SaveChangesAsync();
                        }

                        if(listaModelo.Count(x => x.MenuId > 0) > 0)
                        {
                            await _context.MenuRols.AddRangeAsync(listaModelo);
                            await _context.SaveChangesAsync();
                        }                        

                        await transaccion.CommitAsync();
                    }
                    catch
                    {
                        await transaccion.RollbackAsync();
                        throw new Exception("Error al guardar los datos de los Rol Menus en la base");
                    }
                }
            }
            catch
            {
                throw;
            }

            return true;
        }
    }
}
