using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Venta
{
    public long Id { get; set; }

    public int Neto { get; set; }

    public int Iva { get; set; }

    public int Total { get; set; }

    public long NumeroDocumento { get; set; }

    public int? TipoPagoId { get; set; }

    public int? TipoDocumentoId { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual TipoDocumento? TipoDocumento { get; set; }

    public virtual TipoPago? TipoPago { get; set; }

    public virtual ICollection<VentaDetalle> VentaDetalles { get; set; } = new List<VentaDetalle>();
}
