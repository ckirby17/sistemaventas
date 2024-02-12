import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RolComponent } from './pages/rol/rol.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TipoPagoComponent } from './pages/tipo-pago/tipo-pago.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VentaComponent } from './pages/venta/venta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RolModalComponent } from './dialogs/rol/rol-modal/rol-modal.component';
import { MenuModalComponent } from './dialogs/menu/menu-modal/menu-modal.component';
import { CategoriaModalComponent } from './dialogs/categoria/categoria-modal/categoria-modal.component';
import { UsuarioModalComponent } from './dialogs/usuario/usuario-modal/usuario-modal.component';
import { ProductoModalComponent } from './dialogs/producto/producto-modal/producto-modal.component';
import { PagoModalComponent } from './dialogs/pago/pago-modal/pago-modal.component';
import { DocumentoModalComponent } from './dialogs/documento/documento-modal/documento-modal.component';
import { RolMenuComponent } from './pages/rol/rol-menu/rol-menu.component';
import { SubMenuComponent } from './pages/menu/sub-menu/sub-menu.component';
import { SubMenuModalComponent } from './dialogs/submenu/sub-menu-modal/sub-menu-modal.component';
import { HistorialVentaComponent } from './pages/historial-venta/historial-venta.component';
import { VentaDetalleModalComponent } from './dialogs/ventadetalle/venta-detalle-modal/venta-detalle-modal.component';
import { VentaTablaComponent } from './tables/venta-tabla/venta-tabla.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoriaComponent,
    MenuComponent,
    ProductoComponent,
    RolComponent,
    TipoDocumentoComponent,
    TipoPagoComponent,
    UsuarioComponent,
    VentaComponent,
    RolModalComponent,
    MenuModalComponent,
    CategoriaModalComponent,
    UsuarioModalComponent,
    ProductoModalComponent,
    PagoModalComponent,
    DocumentoModalComponent,
    RolMenuComponent,
    SubMenuComponent,
    SubMenuModalComponent,
    HistorialVentaComponent,
    VentaDetalleModalComponent,
    VentaTablaComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
