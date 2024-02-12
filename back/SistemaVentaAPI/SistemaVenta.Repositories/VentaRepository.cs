using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.Repositories.Contratos;

namespace SistemaVenta.Repositories
{
    public class VentaRepository : GenericRepository<Venta>, IVentaRepository
    {
        private readonly SistemaVentasContext _context;

        public VentaRepository(SistemaVentasContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Venta> Registrar(Venta modelo)
        {
            try
            {
                using (var transaccion = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _context.Entry(modelo).State = EntityState.Added;
                        await _context.Venta.AddAsync(modelo);
                        await _context.SaveChangesAsync();

                        var ventaId = modelo.Id;

                        foreach (VentaDetalle detalle in modelo.VentaDetalles)
                        {
                            _context.Entry(detalle).State = EntityState.Added;
                            detalle.VentaId = ventaId;
                            await _context.VentaDetalles.AddAsync(detalle);
                            await _context.SaveChangesAsync();
                        }
                         
                        await transaccion.CommitAsync();
                        
                        await _context.Entry(modelo).ReloadAsync();
                    }
                    catch
                    {
                        await transaccion.RollbackAsync();
                        throw new Exception("Error al guardar los datos de la venta en la base");
                    }
                }                
            }
            catch
            {
                throw;
            }

            return modelo;
        }
    }
}
