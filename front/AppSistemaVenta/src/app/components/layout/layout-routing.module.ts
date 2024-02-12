import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { RolComponent } from './pages/rol/rol.component';
import { TipoDocumentoComponent } from './pages/tipo-documento/tipo-documento.component';
import { TipoPagoComponent } from './pages/tipo-pago/tipo-pago.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { VentaComponent } from './pages/venta/venta.component';
import { RolMenuComponent } from './pages/rol/rol-menu/rol-menu.component';
import { SubMenuComponent } from './pages/menu/sub-menu/sub-menu.component';
import { HistorialVentaComponent } from './pages/historial-venta/historial-venta.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    { path:'dashboard', component: DashboardComponent },
    { path: 'categoria', component: CategoriaComponent },
    { path: 'rol', component: RolComponent },
    { path: 'rol/rol-menu', component: RolMenuComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'menu/sub-menu', component: SubMenuComponent },
    { path: 'producto', component: ProductoComponent },
    { path: 'tipo-documento', component: TipoDocumentoComponent },
    { path: 'tipo-pago', component: TipoPagoComponent },
    { path: 'usuario', component: UsuarioComponent },
    { path: 'venta', component: VentaComponent },
    { path: 'historial_venta', component: HistorialVentaComponent },
    { path: 'pago', component: TipoPagoComponent },
    { path: 'documento', component: TipoDocumentoComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
