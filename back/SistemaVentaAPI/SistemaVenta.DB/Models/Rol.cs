using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Rol
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual ICollection<MenuRol> MenuRols { get; set; } = new List<MenuRol>();

    public virtual ICollection<Usuario> Usuarios { get; set; } = new List<Usuario>();
}
