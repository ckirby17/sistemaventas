using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class NumeroDocumentoService : INumeroDocumentoService
    {
        private readonly IGenericRepository<NumeroDocumento> _numDocRepository;
        private readonly IMapper _mapper;

        public NumeroDocumentoService(IGenericRepository<NumeroDocumento> numDocRepository, IMapper mapper)
        {
            _numDocRepository = numDocRepository;
            _mapper = mapper;
        }

        public async Task<NumeroDocumentoListarDto> Crear(NumeroDocumentoCrearDto modelo)
        {
            try
            {
                if (modelo.UltimoNumero == null) throw new TaskCanceledException("El campo Último Número es requerido.");
                if (modelo.TipoDocumentoId == null || modelo.TipoDocumentoId == 0) throw new TaskCanceledException("El campo Tipo Documento es requerido.");

                var modeloDb = _mapper.Map<NumeroDocumento>(modelo);
                modeloDb = await _numDocRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<NumeroDocumentoListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(NumeroDocumentoEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Número del Documento no debe ser 0 ni nulo.");
                if (modelo.TipoDocumentoId == 0 || modelo.TipoDocumentoId == null) throw new TaskCanceledException("El campo Tipo Documento es requerido.");

                var modeloDb = _numDocRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Número del Documento para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _numDocRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? numDocId)
        {
            try
            {
                if (numDocId == null || numDocId == 0)
                {
                    throw new TaskCanceledException("El identificador del Número del Documento no debe ser 0 ni nulo.");
                }

                var modeloDb = _numDocRepository.Obtener(c => c.Id == numDocId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Número del Documento para eliminar");
                }

                var resp = await _numDocRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<NumeroDocumentoListarDto>> Listar()
        {
            try
            {
                var listDb = await _numDocRepository.Consultar();
                var listDbInclude = await listDb.Include(td => td.TipoDocumento).ToListAsync();
                var listDto = _mapper.Map<List<NumeroDocumentoListarDto>>(listDbInclude);
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<NumeroDocumentoListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _numDocRepository.Consultar();
                var modeloDbFilter = await modeloDb.Where(td => td.Id == Id).Include(td => td.TipoDocumento).FirstOrDefaultAsync();
                var modeloDto = _mapper.Map<NumeroDocumentoListarDto?>(modeloDbFilter);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
