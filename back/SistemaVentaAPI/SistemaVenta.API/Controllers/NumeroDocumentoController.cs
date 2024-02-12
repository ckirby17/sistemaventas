using Microsoft.AspNetCore.Mvc;
using SistemaVenta.API.Responses;
using SistemaVenta.DTO;
using SistemaVenta.Services.Contratos;
using System.Net;

namespace SistemaVenta.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NumeroDocumentoController : ControllerBase
    {
        private readonly INumeroDocumentoService _service;

        public NumeroDocumentoController(INumeroDocumentoService service)
        {
            _service = service;
        }

        [HttpGet]
        [Route("Listar")]
        public async Task<IActionResult> Listar()
        {
            var resp = new ResponseApi<List<NumeroDocumentoListarDto>>();
            try
            {
                resp.Dato = await _service.Listar();
                resp.Exito = 1;
                resp.Codigo = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                resp.Mensaje = ex.Message;
            }
            return Ok(resp);
        }

        [HttpGet]
        [Route("Obtener/{Id:int}")]
        public async Task<IActionResult> Obtener(int Id)
        {
            var resp = new ResponseApi<NumeroDocumentoListarDto>();
            try
            {
                resp.Dato = await _service.Obtener(Id);
                resp.Exito = 1;
                resp.Codigo = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                resp.Mensaje = ex.Message;
            }
            return Ok(resp);
        }

        [HttpPost]
        [Route("Crear")]
        public async Task<IActionResult> Crear([FromBody] NumeroDocumentoCrearDto modelo)
        {
            var resp = new ResponseApi<NumeroDocumentoListarDto>();
            try
            {
                resp.Dato = await _service.Crear(modelo);
                resp.Exito = 1;
                resp.Codigo = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                resp.Mensaje = ex.Message;
            }
            return Ok(resp);
        }

        [HttpPut]
        [Route("Editar")]
        public async Task<IActionResult> Editar([FromBody] NumeroDocumentoEditarDto modelo)
        {
            var resp = new ResponseApi<bool>();
            try
            {
                resp.Dato = await _service.Editar(modelo);
                resp.Exito = 1;
                resp.Codigo = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                resp.Mensaje = ex.Message;
            }
            return Ok(resp);
        }

        [HttpDelete]
        [Route("Eliminar/{Id:int}")]
        public async Task<IActionResult> Eliminar(int Id)
        {
            var resp = new ResponseApi<bool>();
            try
            {
                resp.Dato = await _service.Eliminar(Id);
                resp.Exito = 1;
                resp.Codigo = HttpStatusCode.OK;
            }
            catch (Exception ex)
            {
                resp.Mensaje = ex.Message;
            }
            return Ok(resp);
        }
    }
}
