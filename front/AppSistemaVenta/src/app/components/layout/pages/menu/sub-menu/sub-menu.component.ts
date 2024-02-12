import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SubMenuListar } from 'src/app/interfaces/models/sub-menu-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { SubMenuService } from 'src/app/services/api/sub-menu.service';
import { SubMenuModalComponent } from '../../../dialogs/submenu/sub-menu-modal/sub-menu-modal.component';
import { SubMenuEditar } from 'src/app/interfaces/models/sub-menu-editar';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'menu', 'icono', 'url', 'nivel', 'orden', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataSubMenu: SubMenuListar[] = [];
  dataTablaSource!: MatTableDataSource<SubMenuListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _subMenuService: SubMenuService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<SubMenuListar>(this.dataSubMenu);
  }

  ngOnInit(): void {
    this.obtenerSubMenus();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerSubMenus(){
    this.mostrarLoading = true;
    this._subMenuService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as SubMenuListar[];
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

  onCrearSubMenu(){
    this.dialog.open(SubMenuModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerSubMenus();
    });
  }

  onEditarSubMenu(subMenu: SubMenuListar){
    let subMenuEditar: SubMenuEditar = subMenu as SubMenuEditar;

    this.dialog.open(SubMenuModalComponent, {
      disableClose: true,
      data: subMenuEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerSubMenus();
    });
  }

  onEliminarSubMenu(subMenu: SubMenuListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Menú', '¿Desea eliminar el Menú ' + subMenu.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._subMenuService.eliminar(subMenu.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Sub Menú eliminado', 'Éxito');
              this.obtenerSubMenus();
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
