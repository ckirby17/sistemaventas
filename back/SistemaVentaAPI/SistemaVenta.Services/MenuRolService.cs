using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class MenuRolService : IMenuRolService
    {
        private readonly IGenericRepository<MenuRol> _menuRolGenericRepository;
        private readonly IMenuRolRepository _menuRolRepository;
        private readonly IMapper _mapper;

        public MenuRolService(IGenericRepository<MenuRol> menuRolGenericRepository, IMapper mapper, IMenuRolRepository menuRolRepository)
        {
            _menuRolGenericRepository = menuRolGenericRepository;
            _menuRolRepository = menuRolRepository;
            _mapper = mapper;
        }

        public async Task<MenuRolListarDto> Crear(MenuRolCrearDto modelo)
        {
            try
            {
                if (modelo.MenuId == 0 || modelo.MenuId == null) throw new TaskCanceledException("El identificador Menu no debe ser 0 ni nulo.");
                if (modelo.RolId == 0 || modelo.RolId == null) throw new TaskCanceledException("El identificador Rol no debe ser 0 ni nulo.");

                var modeloDb = _mapper.Map<MenuRol>(modelo);
                modeloDb = await _menuRolGenericRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<MenuRolListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(MenuRolEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Menú Rol no debe ser 0 ni nulo.");
                if (modelo.MenuId == 0 || modelo.MenuId == null) throw new TaskCanceledException("El identificador Menu no debe ser 0 ni nulo.");
                if (modelo.RolId == 0 || modelo.RolId == null) throw new TaskCanceledException("El identificador Rol no debe ser 0 ni nulo.");

                var modeloDb = _menuRolGenericRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Menú Rol para editar.");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _menuRolGenericRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? menuRolId)
        {
            try
            {
                if (menuRolId == null || menuRolId == 0)
                {
                    throw new TaskCanceledException("El identificador del Menú Rol no debe ser 0 ni nulo.");
                }

                var modeloDb = _menuRolGenericRepository.Obtener(c => c.Id == menuRolId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Menú Rol para eliminar");
                }

                var resp = await _menuRolGenericRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MenuRolListarDto>> Listar()
        {
            try
            {
                var listDb = await _menuRolGenericRepository.Consultar();
                var listDbInclude = await listDb.Include(m => m.Menu).Include(r => r.Rol).ToListAsync();
                var listDto = _mapper.Map<List<MenuRolListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<MenuRolListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _menuRolGenericRepository.Consultar();
                var modelDbFilter = await modeloDb.Where(x => x.Id == Id).Include(m => m.Menu).Include(r => r.Rol).FirstOrDefaultAsync();

                var modeloDto = _mapper.Map<MenuRolListarDto?>(modelDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<MenuRolListarDto>> ObtenerMenusPorRol(int rolId)
        {
            try
            {
                var modeloDb = await _menuRolGenericRepository.Consultar();
                var modelDbFilter = await modeloDb.Where(x => x.RolId == rolId).Include(m => m.Menu).Include(r => r.Rol).Include(sb => sb.Menu.SubMenus).ToListAsync();

                var modeloDto = _mapper.Map<List<MenuRolListarDto>>(modelDbFilter.OrderBy(x => x.Menu.Orden));
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> RegistrarRolMenus(List<MenuRolCrearDto> listaModeloDto)
        {
            try
            {
                var rolId = 0;
                var listaModeloDb = _mapper.Map<List<MenuRol>>(listaModeloDto);

                rolId = listaModeloDb.FirstOrDefault()!.RolId;

                return await _menuRolRepository.Registrar(listaModeloDb, rolId);
            }
            catch
            {
                throw;
            }
        }
    }
}
