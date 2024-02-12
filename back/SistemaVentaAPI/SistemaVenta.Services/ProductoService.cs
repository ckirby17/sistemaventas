using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class ProductoService : IProductoService
    {
        private readonly IGenericRepository<Producto> _productoRepository;
        private readonly IMapper _mapper;

        public ProductoService(IGenericRepository<Producto> productoRepository, IMapper mapper)
        {
            _productoRepository = productoRepository;
            _mapper = mapper;
        }

        public async Task<ProductoListarDto> Crear(ProductoCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<Producto>(modelo);

                modeloDb = await _productoRepository.Crear(modeloDb);

                var modeloDto = _mapper.Map<ProductoListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(ProductoEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Producto no debe ser 0 ni nulo.");

                var modeloDb = _productoRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Producto para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _productoRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? productoId)
        {
            try
            {
                if (productoId == null || productoId == 0)
                {
                    throw new TaskCanceledException("El identificador del Producto no debe ser 0 ni nulo.");
                }

                var modeloDb = _productoRepository.Obtener(c => c.Id == productoId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Producto para eliminar");
                }

                var resp = await _productoRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<ProductoListarDto>> Listar()
        {
            try
            {
                var listDb = await _productoRepository.Consultar();
                var listDbInclude = await listDb.Include(c => c.Categoria).ToListAsync();
                var listDto = _mapper.Map<List<ProductoListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<ProductoListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _productoRepository.Consultar();
                var modeloDbFilter = await modeloDb.Where(c => c.Id == Id).Include(d => d.Categoria).FirstOrDefaultAsync();
                var modeloDto = _mapper.Map<ProductoListarDto?>(modeloDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
