using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class SubMenuService : ISubMenuService
    {
        private readonly IGenericRepository<SubMenu> _subMenuRepository;
        private readonly IMapper _mapper;

        public SubMenuService(IGenericRepository<SubMenu> subMenuRepository, IMapper mapper)
        {
            _subMenuRepository = subMenuRepository;
            _mapper = mapper;
        }

        public async Task<SubMenuListarDto> Crear(SubMenuCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<SubMenu>(modelo);
                modeloDb = await _subMenuRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<SubMenuListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(SubMenuEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null)
                {
                    throw new TaskCanceledException("El identificador del Sub Menú no debe ser 0 ni nulo.");
                }

                var modeloDb = _subMenuRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Sub Menú para editar.");
                }

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _subMenuRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? subMenuId)
        {
            try
            {
                if (subMenuId == null || subMenuId == 0)
                {
                    throw new TaskCanceledException("El identificador del Sub Menú no debe ser 0 ni nulo.");
                }

                var modeloDb = _subMenuRepository.Obtener(c => c.Id == subMenuId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Sub Menú para eliminar");
                }

                var resp = await _subMenuRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<SubMenuListarDto>> Listar()
        {
            try
            {
                var listDb = await _subMenuRepository.Consultar();
                var listDbInclude = await listDb.Include(m => m.Menu).ToListAsync();
                var listDto = _mapper.Map<List<SubMenuListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<SubMenuListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _subMenuRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<SubMenuListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
