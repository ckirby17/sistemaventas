using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IGenericRepository<Usuario> _usuarioRepository;
        private readonly IMapper _mapper;

        public UsuarioService(IGenericRepository<Usuario> usuarioRepository, IMapper mapper)
        {
            _usuarioRepository = usuarioRepository;
            _mapper = mapper;
        }

        public async Task<UsuarioListarDto> Crear(UsuarioCrearDto modelo)
        {
            try
            {
                var modeloDb = _mapper.Map<Usuario>(modelo);
                modeloDb.EsActivo = true;

                modeloDb = await _usuarioRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<UsuarioListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(UsuarioEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Usuario no debe ser 0 ni nulo.");

                var modeloDb = _usuarioRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Usuario para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _usuarioRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? usuarioId)
        {
            try
            {
                if (usuarioId == null || usuarioId == 0)
                {
                    throw new TaskCanceledException("El identificador del Usuario no debe ser 0 ni nulo.");
                }

                var modeloDb = _usuarioRepository.Obtener(c => c.Id == usuarioId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Usuario para eliminar");
                }

                var resp = await _usuarioRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<UsuarioListarDto>> Listar()
        {
            try
            {
                var listDb = await _usuarioRepository.Consultar();
                var listDbInclude = await listDb.Include(r => r.Rol).ToListAsync();
                var listDto = _mapper.Map<List<UsuarioListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<UsuarioListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _usuarioRepository.Consultar();
                var modeloDbFilter = await modeloDb.Where(u => u.Id == Id).Include(r => r.Rol).FirstOrDefaultAsync();
                var modeloDto = _mapper.Map<UsuarioListarDto?>(modeloDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<SessionUsuarioDto?> ValidarCredencial(LoginDto modelo)
        {
            try
            {
                var modeloDb = await _usuarioRepository.Consultar(u => u.EsActivo == true
                && u.Correo == modelo.Correo
                && u.Clave == modelo.Clave);

                if(!modeloDb.Any())
                {
                    throw new Exception("Los datos ingresados, no son válidos");
                }

                return _mapper.Map<SessionUsuarioDto>(modeloDb.Include(r => r.Rol).FirstOrDefault());
            }
            catch
            {
                throw;
            }
        }
    }
}
