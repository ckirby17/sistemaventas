using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SistemaVenta.DB.Models;
using SistemaVenta.Mapping;
using SistemaVenta.Repositories;
using SistemaVenta.Repositories.Contratos;
using SistemaVenta.Services;
using SistemaVenta.Services.Contratos;

namespace SistemaVenta.DI
{
    public static class DependencyInjection
    {
        public static void InyectarDependencias(this IServiceCollection services, IConfiguration configuration)
        {
            //Injeccion dependencia Contexto Base de Datos
            services.AddDbContext<SistemaVentasContext>(opt =>
            {
                opt.UseSqlServer(configuration.GetConnectionString("ConnectionSistemaVentas"));
            });

            //Injeccion dependencia Repositorios
            services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddScoped<IVentaRepository, VentaRepository>();
            services.AddScoped<IMenuRolRepository, MenuRolRepository>();

            //Injeccion dependencia Servicios
            services.AddScoped<ICategoriaService, CategoriaService>();
            services.AddScoped<IMenuRolService, MenuRolService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<INumeroDocumentoService, NumeroDocumentoService>();
            services.AddScoped<IProductoService, ProductoService>();
            services.AddScoped<IRolService, RolService>();
            services.AddScoped<ITipoDocumentoService, TipoDocumentoService>();
            services.AddScoped<ITipoPagoService, TipoPagoService>();
            services.AddScoped<IUsuarioService, UsuarioService>();
            services.AddScoped<IVentaService, VentaService>();
            services.AddScoped<IVentaDetalleService, VentaDetalleService>();
            services.AddScoped<ISubMenuService, SubMenuService>();

            //Injeccion AutoMapper
            services.AddAutoMapper(typeof(MappingProfile));
        }
    }
}
