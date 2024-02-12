import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListar } from 'src/app/interfaces/models/menu-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { MenuService } from 'src/app/services/api/menu.service';
import { MenuModalComponent } from '../../dialogs/menu/menu-modal/menu-modal.component';
import { MenuEditar } from 'src/app/interfaces/models/menu-editar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'icono', 'url', 'orden', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataMenu: MenuListar[] = [];
  dataTablaSource!: MatTableDataSource<MenuListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _menuService: MenuService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<MenuListar>(this.dataMenu);
  }

  ngOnInit(): void {
    this.obtenerMenus();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerMenus(){
    this.mostrarLoading = true;
    this._menuService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as MenuListar[];
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

  onCrearMenu(){
    this.dialog.open(MenuModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerMenus();
    });
  }

  onEditarMenu(menu: MenuListar){
    let menuEditar: MenuEditar = menu as MenuEditar;

    this.dialog.open(MenuModalComponent, {
      disableClose: true,
      data: menuEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerMenus();
    });
  }

  onEliminarMenu(menu: MenuListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Menú', '¿Desea eliminar el Menú ' + menu.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._menuService.eliminar(menu.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Menú eliminado', 'Éxito');
              this.obtenerMenus();
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
