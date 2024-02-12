using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class VentaDetalle
{
    public long Id { get; set; }

    public long? VentaId { get; set; }

    public int? ProductoId { get; set; }

    public int Cantidad { get; set; }

    public int Precio { get; set; }

    public int Total { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual Producto? Producto { get; set; }

    public virtual Venta? Venta { get; set; }
}
