using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.Repositories.Contratos;
using System.Linq.Expressions;

namespace SistemaVenta.Repositories
{
    public class GenericRepository<TModel> : IGenericRepository<TModel> where TModel : class
    {
        private readonly SistemaVentasContext _context;

        public GenericRepository(SistemaVentasContext context)
        {
            _context = context;
        }

        public async Task<TModel?> Obtener(Expression<Func<TModel, bool>> filtro)
        {
            try
            {
                var modelo = await _context.Set<TModel>().FirstOrDefaultAsync(filtro);
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TModel> Crear(TModel modelo)
        {
            try
            {
                await _context.Set<TModel>().AddAsync(modelo);
                await _context.SaveChangesAsync();
                return modelo;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TModel modelo)
        {
            try
            {
                _context.Set<TModel>().Update(modelo);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(TModel modelo)
        {
            try
            {
                _context.Set<TModel>().Remove(modelo);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {
                throw;
            }
        }
        public async Task<IQueryable<TModel>> Consultar(Expression<Func<TModel, bool>>? filtro = null)
        {
            try
            {
                var query = filtro != null ? _context.Set<TModel>().Where(filtro) : _context.Set<TModel>();
                return query;
            }
            catch
            {
                throw;
            }
        }
    }
}
