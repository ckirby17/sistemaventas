using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class MenuRol
{
    public int Id { get; set; }

    public int MenuId { get; set; }

    public int RolId { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual Menu Menu { get; set; } = null!;

    public virtual Rol Rol { get; set; } = null!;
}
