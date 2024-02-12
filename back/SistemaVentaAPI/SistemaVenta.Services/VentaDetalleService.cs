using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class VentaDetalleService : IVentaDetalleService
    {
        private readonly IGenericRepository<VentaDetalle> _ventaDetalleRepository;
        private readonly IMapper _mapper;

        public VentaDetalleService(IGenericRepository<VentaDetalle> ventaDetalleRepository, IMapper mapper)
        {
            _ventaDetalleRepository = ventaDetalleRepository;
            _mapper = mapper;
        }

        public async Task<VentaDetalleListarDto> Crear(VentaDetalleCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<VentaDetalle>(modelo);

                modeloDb = await _ventaDetalleRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<VentaDetalleListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(VentaDetalleEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Detalle Venta no debe ser 0 ni nulo.");

                var modeloDb = _ventaDetalleRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Detalle Venta para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _ventaDetalleRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(long? detalleVtaId)
        {
            try
            {
                if (detalleVtaId == null || detalleVtaId == 0)
                {
                    throw new TaskCanceledException("El identificador del Detalle Venta no debe ser 0 ni nulo.");
                }

                var modeloDb = _ventaDetalleRepository.Obtener(c => c.Id == detalleVtaId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Detalle Venta para eliminar");
                }

                var resp = await _ventaDetalleRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<VentaDetalleListarDto>> Listar()
        {
            try
            {
                var listDb = await _ventaDetalleRepository.Consultar();
                var listDbInclude = await listDb.Include(p => p.Producto).Include(v => v.Venta).ToListAsync();
                var listDto = _mapper.Map<List<VentaDetalleListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<VentaDetalleListarDto>> ListarPorVenta(long ventaId)
        {
            try
            {
                var listDb = await _ventaDetalleRepository.Consultar();
                var listDbFilter = await listDb.Where(dv => dv.VentaId == ventaId).Include(p => p.Producto).Include(v => v.Venta).ToListAsync();
                var listDto = _mapper.Map<List<VentaDetalleListarDto>>(listDbFilter);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<VentaDetalleListarDto?> Obtener(long Id)
        {
            try
            {
                var modeloDb = await _ventaDetalleRepository.Consultar();
                var modeloDbFilter = await modeloDb.Where(dv => dv.Id == Id).Include(p => p.Producto).Include(v => v.Venta).FirstOrDefaultAsync();
                var modeloDto = _mapper.Map<VentaDetalleListarDto?>(modeloDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
