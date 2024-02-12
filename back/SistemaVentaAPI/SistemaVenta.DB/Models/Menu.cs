using System;
using System.Collections.Generic;

namespace SistemaVenta.DB.Models;

public partial class Menu
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Icono { get; set; } = null!;

    public string Url { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public DateTime? FechaActualizacion { get; set; }

    public int Orden { get; set; }

    public virtual ICollection<MenuRol> MenuRols { get; set; } = new List<MenuRol>();

    public virtual ICollection<SubMenu> SubMenus { get; set; } = new List<SubMenu>();
}
