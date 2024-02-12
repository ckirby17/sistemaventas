using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class MenuService : IMenuService
    {
        private readonly IGenericRepository<Menu> _menuRepository;
        private readonly IMapper _mapper;

        public MenuService(IGenericRepository<Menu> menuRepository, IMapper mapper)
        {
            _menuRepository = menuRepository;
            _mapper = mapper;
        }

        public async Task<MenuListarDto> Crear(MenuCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<Menu>(modelo);
                modeloDb = await _menuRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<MenuListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(MenuEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null)
                {
                    throw new TaskCanceledException("El identificador del Menú no debe ser 0 ni nulo.");
                }

                var modeloDb = _menuRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Menú para editar.");
                }

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _menuRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? menuId)
        {
            try
            {
                if (menuId == null || menuId == 0)
                {
                    throw new TaskCanceledException("El identificador del Menú no debe ser 0 ni nulo.");
                }

                var modeloDb = _menuRepository.Obtener(c => c.Id == menuId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Menú para eliminar");
                }

                var resp = await _menuRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MenuListarDto>> Listar()
        {
            try
            {
                var listDb = await _menuRepository.Consultar();
                var listDbInclude = await listDb.Include(rm => rm.MenuRols).Include(sm => sm.SubMenus).ToListAsync();
                var listDto = _mapper.Map<List<MenuListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MenuListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _menuRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<MenuListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
