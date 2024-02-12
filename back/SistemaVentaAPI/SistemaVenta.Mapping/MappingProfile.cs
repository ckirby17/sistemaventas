using AutoMapper;
using SistemaVenta.DB.Models;
using SistemaVenta.DTO;
using System.Globalization;

namespace SistemaVenta.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile() {
            var cultureInfo = new CultureInfo("es-CL");

            #region Categoria
            CreateMap<Categoria, CategoriaListarDto>()
                .ForMember(categoriaDto =>
                    categoriaDto.FechaCreacion,
                    opt => opt.MapFrom(categoria => categoria.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(categoriaDto =>
                    categoriaDto.FechaActualizacion,
                    opt => opt.MapFrom(categoria => categoria.FechaActualizacion != null ? categoria.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(categoriaDto =>
                    categoriaDto.EsActivoTexto,
                    opt => opt.MapFrom(categoria => categoria.EsActivo == true ? "Activo" : "Inactivo")
                );
            CreateMap<CategoriaCrearDto, Categoria>().ReverseMap();
            CreateMap<CategoriaEditarDto, Categoria>().ReverseMap();
            #endregion Categoria

            #region Menu
            CreateMap<Menu, MenuListarDto>()
                .ForMember(menuDto =>
                    menuDto.FechaCreacion,
                    opt => opt.MapFrom(menu => menu.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(menuDto =>
                    menuDto.FechaActualizacion,
                    opt => opt.MapFrom(menu => menu.FechaActualizacion != null ? menu.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                );


            CreateMap<MenuCrearDto, Menu>().ReverseMap();
            CreateMap<MenuEditarDto, Menu>().ReverseMap();
            #endregion Menu

            #region SubMenu
            CreateMap<SubMenu, SubMenuListarDto>()
                .ForMember(subMenuDto =>
                    subMenuDto.FechaCreacion,
                    opt => opt.MapFrom(subMenu => subMenu.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(subMenuDto =>
                    subMenuDto.FechaActualizacion,
                    opt => opt.MapFrom(subMenu => subMenu.FechaActualizacion != null ? subMenu.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(subMenuDto =>
                    subMenuDto.MenuNombre,
                    opt => opt.MapFrom(subMenu => subMenu.Menu != null ? subMenu.Menu.Nombre : string.Empty)
                );

            CreateMap<SubMenuCrearDto, SubMenu>().ReverseMap();
            CreateMap<SubMenuEditarDto, SubMenu>().ReverseMap();
            #endregion SubMenu

            #region Rol

            CreateMap<Rol, RolListarDto>()
                .ForMember(rolDto =>
                    rolDto.FechaCreacion,
                    opt => opt.MapFrom(rol => rol.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(rolDto =>
                    rolDto.FechaActualizacion,
                    opt => opt.MapFrom(rol => rol.FechaActualizacion != null ? rol.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                );

            CreateMap<RolListarDto, Rol>()
                .ForMember(rol =>
                    rol.FechaCreacion,
                    opt => opt.MapFrom(rolDto => Convert.ToDateTime(rolDto.FechaCreacion))
                )
                .ForMember(rol =>
                    rol.FechaActualizacion,
                    opt => opt.MapFrom(rolDto => Convert.ToDateTime(rolDto.FechaActualizacion))
                );

            CreateMap<RolCrearDto, Rol>().ReverseMap();
            CreateMap<RolEditarDto, Rol>().ReverseMap();
            #endregion Rol

            #region MenuRol
            CreateMap<MenuRol, MenuRolListarDto>()
                .ForMember(rolMenuDto =>
                    rolMenuDto.FechaCreacion,
                    opt => opt.MapFrom(rolMenu => rolMenu.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(rolMenuDto =>
                    rolMenuDto.FechaActualizacion,
                    opt => opt.MapFrom(rolMenu => rolMenu.FechaActualizacion != null ? rolMenu.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                );
            CreateMap<MenuRolCrearDto, MenuRol>().ReverseMap();
            CreateMap<MenuRolEditarDto, MenuRol>().ReverseMap();
            #endregion MenuRol

            #region NumeroDocumento
            CreateMap<NumeroDocumentoListarDto, NumeroDocumento>().ReverseMap();
            CreateMap<NumeroDocumentoCrearDto, NumeroDocumento>().ReverseMap();
            CreateMap<NumeroDocumentoEditarDto, NumeroDocumento>().ReverseMap();
            #endregion NumeroDocumento

            #region Producto
            CreateMap<Producto, ProductoListarDto>()
                .ForMember(productoDto =>
                    productoDto.FechaCreacion,
                    opt => opt.MapFrom(producto => producto.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(productoDto =>
                    productoDto.FechaActualizacion,
                    opt => opt.MapFrom(producto => producto.FechaActualizacion != null ? producto.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(productoDto =>
                    productoDto.EsActivoTexto,
                    opt => opt.MapFrom(producto => producto.EsActivo == true ? "Activo" : "Inactivo")
                )
                .ForMember(productoDto =>
                    productoDto.CategoriaNombre,
                    opt => opt.MapFrom(producto => producto.Categoria == null ? string.Empty : producto.Categoria.Nombre)
                )
                .ForMember(productoDto =>
                    productoDto.PrecioCosto,
                    opt => opt.MapFrom(producto => Convert.ToString(producto.PrecioCosto.ToString("N0"), cultureInfo))
                )
                .ForMember(productoDto =>
                    productoDto.PrecioVenta,
                    opt => opt.MapFrom(producto => Convert.ToString(producto.PrecioVenta.ToString("N0"), cultureInfo))
                )
                .ForMember(productoDto =>
                    productoDto.StockMinimo,
                    opt => opt.MapFrom(producto => Convert.ToString(producto.StockMinimo.ToString("N0"), cultureInfo))
                )
                .ForMember(productoDto =>
                    productoDto.StockActual,
                    opt => opt.MapFrom(producto => Convert.ToString(producto.StockActual.ToString("N0"), cultureInfo))
                );

            CreateMap<ProductoCrearDto, Producto>()
                .ForMember(producto =>
                    producto.PrecioCosto,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.PrecioCosto!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.PrecioVenta,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.PrecioVenta!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.StockMinimo,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.StockMinimo!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.StockActual,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.StockActual!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            CreateMap<ProductoEditarDto, Producto>()
                .ForMember(producto =>
                    producto.PrecioCosto,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.PrecioCosto.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.PrecioVenta,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.PrecioVenta!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.StockMinimo,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.StockMinimo!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(producto =>
                    producto.StockActual,
                    opt => opt.MapFrom(productoDto => Convert.ToInt32(productoDto.StockActual!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            #endregion Producto

            #region TipoDocumento
            CreateMap<TipoDocumento, TipoDocumentoListarDto>()
                .ForMember(docDto =>
                    docDto.FechaCreacion,
                    opt => opt.MapFrom(doc => doc.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(docDto =>
                    docDto.FechaActualizacion,
                    opt => opt.MapFrom(doc => doc.FechaActualizacion != null ? doc.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(docDto =>
                    docDto.EsActivoTexto,
                    opt => opt.MapFrom(doc => doc.EsActivo == true ? "Activo" : "Inactivo")
                );
            CreateMap<TipoDocumentoCrearDto, TipoDocumento>().ReverseMap();
            CreateMap<TipoDocumentoEditarDto, TipoDocumento>().ReverseMap();
            #endregion TipoDocumento

            #region TipoPago
            CreateMap<TipoPago, TipoPagoListarDto>()
                .ForMember(pagoDto =>
                    pagoDto.FechaCreacion,
                    opt => opt.MapFrom(pago => pago.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(pagoDto =>
                    pagoDto.FechaActualizacion,
                    opt => opt.MapFrom(pago => pago.FechaActualizacion != null ? pago.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(pagoDto =>
                    pagoDto.EsActivoTexto,
                    opt => opt.MapFrom(pago => pago.EsActivo == true ? "Activo" : "Inactivo")
                );
            CreateMap<TipoPagoCrearDto, TipoPago>().ReverseMap();
            CreateMap<TipoPagoEditarDto, TipoPago>().ReverseMap();
            #endregion TipoPago

            #region Venta
            CreateMap<Venta, VentaListarDto>()
                .ForMember(ventaDto =>
                    ventaDto.FechaCreacion,
                    opt => opt.MapFrom(venta => venta.FechaCreacion.ToString("dd-MM-yyy"))
                )
                .ForMember(ventaDto =>
                    ventaDto.FechaActualizacion,
                    opt => opt.MapFrom(venta => venta.FechaActualizacion != null ? venta.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(ventaDto =>
                    ventaDto.Neto,
                    opt => opt.MapFrom(venta => Convert.ToString(venta.Neto.ToString("N0"), cultureInfo))
                )
                .ForMember(ventaDto =>
                    ventaDto.Iva,
                    opt => opt.MapFrom(venta => Convert.ToString(venta.Iva.ToString("N0"), cultureInfo))
                )
                .ForMember(ventaDto =>
                    ventaDto.Total,
                    opt => opt.MapFrom(venta => Convert.ToString(venta.Total.ToString("N0"), cultureInfo))
                )
                .ForMember(ventaDto =>
                    ventaDto.NumeroDocumento,
                    opt => opt.MapFrom(venta => Convert.ToString(venta.NumeroDocumento.ToString("N0"), cultureInfo))
                )
                .ForMember(ventaDto =>
                    ventaDto.TipoDocumentoNombre,
                    opt => opt.MapFrom(venta => venta.TipoDocumento != null ? venta.TipoDocumento.Nombre : string.Empty)
                )
                .ForMember(ventaDto =>
                    ventaDto.TipoDocumentoSigla,
                    opt => opt.MapFrom(venta => venta.TipoDocumento != null ? venta.TipoDocumento.Sigla : string.Empty)
                )
                .ForMember(ventaDto =>
                    ventaDto.TipoPagoNombre,
                    opt => opt.MapFrom(venta => venta.TipoPago != null ? venta.TipoPago.Nombre : string.Empty)
                )
                .ForMember(ventaDto =>
                    ventaDto.TipoPagoSigla,
                    opt => opt.MapFrom(venta => venta.TipoPago != null ? venta.TipoPago.Sigla : string.Empty)
                );
            CreateMap<VentaCrearDto, Venta>()
                .ForMember(venta =>
                    venta.Neto,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Neto!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(venta =>
                    venta.Iva,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Iva!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(venta =>
                    venta.Total,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Total!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            CreateMap<VentaEditarDto, Venta>()
                .ForMember(venta =>
                    venta.Neto,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Neto!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(venta =>
                    venta.Iva,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Iva!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(venta =>
                    venta.Total,
                    opt => opt.MapFrom(ventaDto => Convert.ToInt32(ventaDto.Total!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            #endregion Venta

            #region VentaDetalleDto
            CreateMap<VentaDetalle, VentaDetalleListarDto>()
                .ForMember(detalleDto =>
                    detalleDto.FechaCreacion,
                    opt => opt.MapFrom(detalleventa => detalleventa.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(detalleDto =>
                    detalleDto.FechaActualizacion,
                    opt => opt.MapFrom(detalleventa => detalleventa.FechaActualizacion != null ? detalleventa.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(detalleDto =>
                    detalleDto.Precio,
                    opt => opt.MapFrom(detalleventa => Convert.ToString(detalleventa.Precio.ToString("N0"), cultureInfo))
                )
                .ForMember(detalleDto =>
                    detalleDto.Total,
                    opt => opt.MapFrom(detalleventa => Convert.ToString(detalleventa.Total.ToString("N0"), cultureInfo))
                );
            CreateMap<VentaDetalleCrearDto, VentaDetalle>()
                .ForMember(detalleventa =>
                    detalleventa.Precio,
                    opt => opt.MapFrom(detalleDto => Convert.ToInt32(detalleDto.Precio!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(detalleventa =>
                    detalleventa.Total,
                    opt => opt.MapFrom(detalleDto => Convert.ToInt32(detalleDto.Total!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            CreateMap<VentaDetalleEditarDto, VentaDetalle>()
                .ForMember(detalleventa =>
                    detalleventa.Precio,
                    opt => opt.MapFrom(detalleDto => Convert.ToInt32(detalleDto.Precio!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                )
                .ForMember(detalleventa =>
                    detalleventa.Total,
                    opt => opt.MapFrom(detalleDto => Convert.ToInt32(detalleDto.Total!.Replace(cultureInfo.NumberFormat.NumberGroupSeparator, "")))
                );
            #endregion VentaDetalleDto

            #region Usuario
            CreateMap<Usuario, UsuarioListarDto>()
                .ForMember(usuarioDto =>
                    usuarioDto.FechaCreacion,
                    opt => opt.MapFrom(usuario => usuario.FechaCreacion.ToString("dd-MM-yyy HH:mm:ss"))
                )
                .ForMember(usuarioDto =>
                    usuarioDto.FechaActualizacion,
                    opt => opt.MapFrom(usuario => usuario.FechaActualizacion != null ? usuario.FechaActualizacion.Value.ToString("dd-MM-yyy HH:mm:ss") : null)
                )
                .ForMember(usuarioDto =>
                    usuarioDto.EsActivoTexto,
                    opt => opt.MapFrom(usuario => usuario.EsActivo == true ? "Activo" : "Inactivo")
                )
                .ForMember(usuarioDto => 
                    usuarioDto.RolNombre,
                    opt => opt.MapFrom(usuario => usuario.Rol.Nombre)
                );
            CreateMap<UsuarioCrearDto, Usuario>().ReverseMap();
            CreateMap<UsuarioEditarDto, Usuario>().ReverseMap();
            CreateMap<Usuario, SessionUsuarioDto>();
            #endregion Usuario
        }
    }
}