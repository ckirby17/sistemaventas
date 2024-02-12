using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Categoria
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public bool EsActivo { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual ICollection<Producto> Productos { get; set; } = new List<Producto>();
}
