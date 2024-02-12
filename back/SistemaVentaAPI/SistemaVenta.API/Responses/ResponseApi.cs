using System.Net;

namespace SistemaVenta.API.Responses
{
    public class ResponseApi<T>
    {
        public int Exito { get; set; }
        public HttpStatusCode Codigo { get; set; }
        public string? Mensaje { get; set; }
        public T? Dato { get; set; }

        public ResponseApi()
        {
            Exito = 0;
            Codigo = HttpStatusCode.BadRequest;
            Mensaje = string.Empty;
        }
    }
}