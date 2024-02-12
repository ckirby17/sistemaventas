using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class RolService : IRolService
    {
        private readonly IGenericRepository<Rol> _rolRepository;
        private readonly IMapper _mapper;

        public RolService(IGenericRepository<Rol> rolRepository, IMapper mapper)
        {
            _rolRepository = rolRepository;
            _mapper = mapper;
        }

        public async Task<RolListarDto> Crear(RolCrearDto modelo)
        {
            try
            {
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");                

                var modeloDb = _mapper.Map<Rol>(modelo);
                modeloDb = await _rolRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<RolListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(RolEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Rol no debe ser 0 ni nulo.");
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");                

                var modeloDb = _rolRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Rol para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _rolRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? rolId)
        {
            try
            {
                if (rolId == null || rolId == 0)
                {
                    throw new TaskCanceledException("El identificador del Rol no debe ser 0 ni nulo.");
                }

                var modeloDb = _rolRepository.Obtener(c => c.Id == rolId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Rol para eliminar");
                }

                var resp = await _rolRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<RolListarDto>> Listar()
        {
            try
            {
                var listDb = await _rolRepository.Consultar();
                var listDbInclude = await listDb.Include(rm => rm.MenuRols).ToListAsync();
                var listDto = _mapper.Map<List<RolListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<RolListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _rolRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<RolListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
