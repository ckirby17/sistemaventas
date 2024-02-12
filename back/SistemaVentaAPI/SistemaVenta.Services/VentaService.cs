using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class VentaService : IVentaService
    {
        private readonly IGenericRepository<Venta> _ventaGenericaRepository;
        private readonly IVentaRepository _ventaRepository;
        private readonly IMapper _mapper;

        public VentaService(IGenericRepository<Venta> ventaGenericaRepository, IVentaRepository ventaRepository, IMapper mapper)
        {
            _ventaGenericaRepository = ventaGenericaRepository;
            _ventaRepository = ventaRepository;
            _mapper = mapper;
        }

        public async Task<bool> Editar(VentaEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador de la Venta no debe ser 0 ni nulo.");

                var modeloDb = _ventaGenericaRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró la Venta para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _ventaGenericaRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(long? ventaId)
        {
            try
            {
                if (ventaId == null || ventaId == 0)
                {
                    throw new TaskCanceledException("El identificador de la Venta no debe ser 0 ni nulo.");
                }

                var modeloDb = _ventaGenericaRepository.Obtener(c => c.Id == ventaId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró la Venta para eliminar");
                }

                var resp = await _ventaGenericaRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<VentaListarDto>> Listar()
        {
            try
            {
                var listDb = await _ventaGenericaRepository.Consultar();
                var listDbInclude = await listDb.Include(td => td.TipoDocumento)
                                        .Include(tp => tp.TipoPago)
                                        .Include(dv => dv.VentaDetalles)
                                        .ToListAsync();

                var listDto = _mapper.Map<List<VentaListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<VentaListarDto?> Obtener(long Id)
        {
            try
            {
                var modeloDb = await _ventaGenericaRepository.Consultar();
                var modeloDbFilter = await modeloDb.Where(x => x.Id == Id)
                                            .Include(td => td.TipoDocumento)
                                            .Include(tp => tp.TipoPago)
                                            .Include(dv => dv.VentaDetalles)
                                            .FirstOrDefaultAsync();

                var modeloDto = _mapper.Map<VentaListarDto?>(modeloDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<VentaListarDto> Registrar(VentaCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<Venta>(modelo);    

                modeloDb = await _ventaRepository.Registrar(modeloDb);

                var modeloDto = _mapper.Map<VentaListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<VentaListarDto>> ObtenerHistorial(HistorialVentaDto modeloDto)
        {
            try
            {
                var listaVentaDto = new List<VentaListarDto>();

                if (modeloDto.NumeroDocumento != null && modeloDto.NumeroDocumento != 0)
                {
                    var listaModeloNdDb = await _ventaGenericaRepository.Consultar(x => x.NumeroDocumento == modeloDto.NumeroDocumento)
                        .Result.Include(dv => dv.VentaDetalles)
                        .Include(td => td.TipoDocumento)
                        .Include(tp => tp.TipoPago)
                        .ToListAsync();

                    listaVentaDto = _mapper.Map<List<VentaListarDto>>(listaModeloNdDb);
                    return listaVentaDto;
                }

                if (modeloDto.FechaInicio.IsNullOrEmpty() || modeloDto.FechaFin.IsNullOrEmpty())
                {
                    throw new Exception("La Fecha Inicio y Fecha Fin deben contener datos para filtrar");
                }

                var fechaInicio = Convert.ToDateTime(modeloDto.FechaInicio + " 00:00:00");
                var fechaFin = Convert.ToDateTime(modeloDto.FechaFin + " 23:59:59");

                if(fechaInicio > fechaFin)
                {
                    throw new Exception("Fecha Inicio no debe ser mayor a la Fecha Fin");
                }

                var listaModeloxfDb = await _ventaGenericaRepository.Consultar(x => x.FechaCreacion >= fechaInicio && x.FechaCreacion <= fechaFin)
                    .Result.Include(dv => dv.VentaDetalles)
                    .Include(td => td.TipoDocumento)
                    .Include(tp => tp.TipoPago)
                    .ToListAsync();

                listaVentaDto = _mapper.Map<List<VentaListarDto>>(listaModeloxfDb);

                return listaVentaDto;
                
            }
            catch
            {
                throw new Exception("Ha ocurrido un error al ejecutar la consulta.");
            }
        }
    }
}