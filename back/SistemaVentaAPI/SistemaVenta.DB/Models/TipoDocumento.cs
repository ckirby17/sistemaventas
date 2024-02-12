using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class TipoDocumento
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Sigla { get; set; } = null!;

    public bool EsActivo { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual ICollection<NumeroDocumento> NumeroDocumentos { get; set; } = new List<NumeroDocumento>();

    public virtual ICollection<Venta> Venta { get; set; } = new List<Venta>();
}
