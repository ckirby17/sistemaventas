using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class NumeroDocumento
{
    public int Id { get; set; }

    public long UltimoNumero { get; set; }

    public int? TipoDocumentoId { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual TipoDocumento? TipoDocumento { get; set; }
}
