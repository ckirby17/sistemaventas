using AutoMapper;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class TipoDocumentoService : ITipoDocumentoService
    {
        private readonly IGenericRepository<TipoDocumento> _tipoDocumentoRepository;
        private readonly IMapper _mapper;

        public TipoDocumentoService(IGenericRepository<TipoDocumento> tipoDocumentoRepository, IMapper mapper)
        {
            _tipoDocumentoRepository = tipoDocumentoRepository;
            _mapper = mapper;
        }

        public async Task<TipoDocumentoListarDto> Crear(TipoDocumentoCrearDto modelo)
        {
            try
            {
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");
                if (modelo.Sigla == string.Empty) throw new TaskCanceledException("El campo Sigla es requerido.");               

                var modeloDb = _mapper.Map<TipoDocumento>(modelo);             

                modeloDb = await _tipoDocumentoRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<TipoDocumentoListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TipoDocumentoEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Tipo Documento no debe ser 0 ni nulo.");
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");
                if (modelo.Sigla == string.Empty) throw new TaskCanceledException("El campo Sigla es requerido.");
                if (modelo.EsActivo == null) throw new TaskCanceledException("El campo Es Activo es requerido.");

                var modeloDb = _tipoDocumentoRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Tipo Documento para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _tipoDocumentoRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? tipoDocId)
        {
            try
            {
                if (tipoDocId == null || tipoDocId == 0)
                {
                    throw new TaskCanceledException("El identificador del Tipo Documento no debe ser 0 ni nulo.");
                }

                var modeloDb = _tipoDocumentoRepository.Obtener(c => c.Id == tipoDocId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Tipo Documento para eliminar");
                }

                var resp = await _tipoDocumentoRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<TipoDocumentoListarDto>> Listar()
        {
            try
            {
                var listDb = await _tipoDocumentoRepository.Consultar();
                var listDto = _mapper.Map<List<TipoDocumentoListarDto>>(listDb.ToList());
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TipoDocumentoListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _tipoDocumentoRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<TipoDocumentoListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
