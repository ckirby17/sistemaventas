import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoListar } from 'src/app/interfaces/models/producto-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { ProductoService } from 'src/app/services/api/producto.service';
import { ProductoModalComponent } from '../../dialogs/producto/producto-modal/producto-modal.component';
import { ProductoEditar } from 'src/app/interfaces/models/producto-editar';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'categoriaNombre', 'precioCosto', 'precioVenta', 'stockMinimo', 'stockActual', 'esActivoTexto', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataProducto: ProductoListar[] = [];
  dataTablaSource!: MatTableDataSource<ProductoListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _productoService: ProductoService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<ProductoListar>(this.dataProducto);
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerProductos() {
    this.mostrarLoading = true;
    this._productoService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as ProductoListar[];
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
        this.mostrarLoading = false;
      }
    });
  }

  aplicarFiltroTabla(evento: Event){
    const filterValor = (evento.target as HTMLInputElement).value;
    this.dataTablaSource.filter = filterValor.trim().toLowerCase();

    if (this.dataTablaSource.paginator) {
      this.dataTablaSource.paginator.firstPage();
    }
  }

  onCrearProducto(){
    this.dialog.open(ProductoModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerProductos();
    });
  }

  onEditarProducto(producto: ProductoListar){
    let productoEditar: ProductoEditar = producto as ProductoEditar;

    this.dialog.open(ProductoModalComponent, {
      disableClose: true,
      data: productoEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerProductos();
    });
  }

  onEliminarProducto(producto: ProductoListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Producto', '¿Desea eliminar el Producto ' + producto.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._productoService.eliminar(producto.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Producto eliminado', 'Éxito');
              this.obtenerProductos();
            }
            else {
              this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
            }
          },
          error: () => {
            this._snackService.mostrarSnackBarError('Error en el sistema, intente más tarde', 'Error');
          }
        });
      }
    });
  }
}
