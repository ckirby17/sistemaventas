using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class CategoriaService : ICategoriaService
    {
        private readonly IGenericRepository<Categoria> _categoriaRepository;
        private readonly IMapper _mapper;

        public CategoriaService(IGenericRepository<Categoria> categoriaRepository, IMapper mapper)
        {
            _categoriaRepository = categoriaRepository;
            _mapper = mapper;
        }

        public async Task<CategoriaListarDto> Crear(CategoriaCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<Categoria>(modelo);
                modeloDb = await _categoriaRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<CategoriaListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(CategoriaEditarDto modelo)
        {
            try
            {
                if(modelo.Id == 0 || modelo.Id == null)
                {
                    throw new TaskCanceledException("El identificador de la Categoría no debe ser 0 ni nulo.");
                }

                var modeloDb = _categoriaRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró la Categoría para editar o no se encuentra activo.");
                }

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _categoriaRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? categoriaId)
        {
            try
            {
                if (categoriaId == null || categoriaId == 0)
                {
                    throw new TaskCanceledException("El identificador de la Categoría no debe ser 0 ni nulo.");
                }

                var modeloDb = _categoriaRepository.Obtener(c => c.Id == categoriaId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró la Categoría para eliminar");
                }

                var resp = await _categoriaRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<CategoriaListarDto>> Listar()
        {
            try
            {

                var listDb = await _categoriaRepository.Consultar();
                var listModelDb = await listDb.Include(p => p.Productos).ToListAsync();

                var listDto = _mapper.Map<List<CategoriaListarDto>>(listModelDb);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<CategoriaListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _categoriaRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<CategoriaListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
