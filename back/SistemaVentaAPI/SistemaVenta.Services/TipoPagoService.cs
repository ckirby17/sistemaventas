using AutoMapper;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.Services
{
    public class TipoPagoService : ITipoPagoService
    {
        private readonly IGenericRepository<TipoPago> _tipoPagoRepository;
        private readonly IMapper _mapper;

        public TipoPagoService(IGenericRepository<TipoPago> tipoPagoRepository, IMapper mapper)
        {
            _tipoPagoRepository = tipoPagoRepository;
            _mapper = mapper;
        }

        public async Task<TipoPagoListarDto> Crear(TipoPagoCrearDto modelo)
        {
            try
            {
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");
                if (modelo.Sigla == string.Empty) throw new TaskCanceledException("El campo Sigla es requerido.");

                var modeloDb = _mapper.Map<TipoPago>(modelo);

                modeloDb = await _tipoPagoRepository.Crear(modeloDb);
                var modeloDto = _mapper.Map<TipoPagoListarDto>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Editar(TipoPagoEditarDto modelo)
        {
            try
            {
                if (modelo.Id == 0 || modelo.Id == null) throw new TaskCanceledException("El identificador del Tipo Pago no debe ser 0 ni nulo.");
                if (modelo.Nombre == string.Empty) throw new TaskCanceledException("El campo Nombre es requerido.");
                if (modelo.Sigla == string.Empty) throw new TaskCanceledException("El campo Sigla es requerido.");
                if (modelo.EsActivo == null) throw new TaskCanceledException("El campo Es Activo es requerido.");

                var modeloDb = _tipoPagoRepository.Obtener(c => c.Id == modelo.Id).Result;

                if (modeloDb == null) throw new TaskCanceledException("No se encontró el Tipo Pago para editar");

                modeloDb.FechaActualizacion = DateTime.Now;

                modeloDb = _mapper.Map(modelo, modeloDb);
                var resp = await _tipoPagoRepository.Editar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<bool> Eliminar(int? tipoPagoId)
        {
            try
            {
                if (tipoPagoId == null || tipoPagoId == 0)
                {
                    throw new TaskCanceledException("El identificador del Tipo Pago no debe ser 0 ni nulo.");
                }

                var modeloDb = _tipoPagoRepository.Obtener(c => c.Id == tipoPagoId).Result;

                if (modeloDb == null)
                {
                    throw new TaskCanceledException("No se encontró el Tipo Pago para eliminar");
                }

                var resp = await _tipoPagoRepository.Eliminar(modeloDb);
                return resp;
            }
            catch
            {
                throw;
            }
        }

        public async Task<List<TipoPagoListarDto>> Listar()
        {
            try
            {
                var listDb = await _tipoPagoRepository.Consultar();
                var listDto = _mapper.Map<List<TipoPagoListarDto>>(listDb.ToList());
                return listDto;
            }
            catch
            {
                throw;
            }
        }

        public async Task<TipoPagoListarDto?> Obtener(int Id)
        {
            try
            {
                var modeloDb = await _tipoPagoRepository.Obtener(c => c.Id == Id);
                var modeloDto = _mapper.Map<TipoPagoListarDto?>(modeloDb);
                return modeloDto;
            }
            catch
            {
                throw;
            }
        }
    }
}
