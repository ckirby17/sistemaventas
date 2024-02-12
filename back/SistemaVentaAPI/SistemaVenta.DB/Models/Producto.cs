using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Producto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public int? CategoriaId { get; set; }

    public int PrecioCosto { get; set; }

    public int PrecioVenta { get; set; }

    public int StockMinimo { get; set; }

    public int StockActual { get; set; }

    public bool EsActivo { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual Categoria? Categoria { get; set; }

    public virtual ICollection<VentaDetalle> VentaDetalles { get; set; } = new List<VentaDetalle>();
}
