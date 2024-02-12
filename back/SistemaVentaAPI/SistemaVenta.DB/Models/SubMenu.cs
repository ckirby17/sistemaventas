using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class SubMenu
{
    public int Id { get; set; }

    public int MenuId { get; set; }

    public string Nombre { get; set; } = null!;

    public string Icono { get; set; } = null!;

    public string Url { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public int Nivel { get; set; }

    public int Orden { get; set; }

    public virtual Menu Menu { get; set; } = null!;
}
