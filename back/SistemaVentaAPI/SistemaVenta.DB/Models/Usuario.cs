using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido { get; set; } = null!;

    public string Correo { get; set; } = null!;

    public string Clave { get; set; } = null!;

    public bool EsActivo { get; set; }

    public int RolId { get; set; }

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public virtual Rol Rol { get; set; } = null!;
}
