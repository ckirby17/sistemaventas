using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SistemaVenta.DB.Models;

public partial class SistemaVentasContext : DbContext
{
    public SistemaVentasContext()
    {
    }

    public SistemaVentasContext(DbContextOptions<SistemaVentasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categoria> Categoria { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<MenuRol> MenuRols { get; set; }

    public virtual DbSet<NumeroDocumento> NumeroDocumentos { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<SubMenu> SubMenus { get; set; }

    public virtual DbSet<TipoDocumento> TipoDocumentos { get; set; }

    public virtual DbSet<TipoPago> TipoPagos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<VentaDetalle> VentaDetalles { get; set; }

    public virtual DbSet<Venta> Venta { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3214EC07F3AAF1CC");

            entity.Property(e => e.EsActivo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Menu__3214EC075DF96BB3");

            entity.ToTable("Menu");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Icono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Url)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<MenuRol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MenuRol__3214EC07F5CC9C6F");

            entity.ToTable("MenuRol");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Menu).WithMany(p => p.MenuRols)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MenuRol__MenuId__3D5E1FD2");

            entity.HasOne(d => d.Rol).WithMany(p => p.MenuRols)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MenuRol__RolId__3E52440B");
        });

        modelBuilder.Entity<NumeroDocumento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NumeroDo__3214EC0771D59A11");

            entity.ToTable("NumeroDocumento");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.TipoDocumento).WithMany(p => p.NumeroDocumentos)
                .HasForeignKey(d => d.TipoDocumentoId)
                .HasConstraintName("FK__NumeroDoc__TipoD__534D60F1");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Producto__3214EC074F55D37C");

            entity.ToTable("Producto");

            entity.Property(e => e.EsActivo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Categoria).WithMany(p => p.Productos)
                .HasForeignKey(d => d.CategoriaId)
                .HasConstraintName("FK__Producto__Catego__4AB81AF0");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Rol__3214EC072FE06A6B");

            entity.ToTable("Rol");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SubMenu>(entity =>
        {
            entity.ToTable("SubMenu");

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Icono)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Url)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Menu).WithMany(p => p.SubMenus)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SubMenu_Menu");
        });

        modelBuilder.Entity<TipoDocumento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TipoDocu__3214EC07FEB311F5");

            entity.ToTable("TipoDocumento");

            entity.Property(e => e.EsActivo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Sigla)
                .HasMaxLength(3)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TipoPago>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TipoPago__3214EC0737DDEF82");

            entity.ToTable("TipoPago");

            entity.Property(e => e.EsActivo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.Sigla)
                .HasMaxLength(3)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC07E2F2FA6B");

            entity.ToTable("Usuario");

            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Clave)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Correo)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.EsActivo).HasDefaultValue(true);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Rol).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.RolId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Usuario__RolId__4316F928");
        });

        modelBuilder.Entity<VentaDetalle>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__VentaDet__3214EC07480D18A8");

            entity.ToTable("VentaDetalle", tb => tb.HasTrigger("InsertStockProducto"));

            entity.Property(e => e.Descripcion)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Producto).WithMany(p => p.VentaDetalles)
                .HasForeignKey(d => d.ProductoId)
                .HasConstraintName("FK__VentaDeta__Produ__60A75C0F");

            entity.HasOne(d => d.Venta).WithMany(p => p.VentaDetalles)
                .HasForeignKey(d => d.VentaId)
                .HasConstraintName("FK__VentaDeta__Venta__5FB337D6");
        });

        modelBuilder.Entity<Venta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Venta__3214EC07F02AF033");

            entity.ToTable(tb => tb.HasTrigger("InsertNumeroDocumentoVenta"));

            entity.Property(e => e.FechaActualizacion).HasColumnType("datetime");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.TipoDocumento).WithMany(p => p.Venta)
                .HasForeignKey(d => d.TipoDocumentoId)
                .HasConstraintName("FK__Venta__TipoDocum__5BE2A6F2");

            entity.HasOne(d => d.TipoPago).WithMany(p => p.Venta)
                .HasForeignKey(d => d.TipoPagoId)
                .HasConstraintName("FK__Venta__TipoPagoI__5AEE82B9");
        });

        modelBuilder.Entity<Venta>().ToTable(v => v.HasTrigger("InsertNumeroDocumentoVenta"));

        modelBuilder.Entity<VentaDetalle>().ToTable(vd => vd.HasTrigger("InsertStockProducto"));

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
