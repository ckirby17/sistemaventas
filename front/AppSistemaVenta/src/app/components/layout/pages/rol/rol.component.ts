import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { RolModalComponent } from '../../dialogs/rol/rol-modal/rol-modal.component';
import { RolListar } from 'src/app/interfaces/models/rol-listar';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { RolService } from 'src/app/services/api/rol.service';
import { RolEditar } from 'src/app/interfaces/models/rol-editar';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.scss']
})
export class RolComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataRol: RolListar[] = [];
  dataTablaSource!: MatTableDataSource<RolListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _rolService: RolService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<RolListar>(this.dataRol);
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerRoles(){
    this.mostrarLoading = true;
    this._rolService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as RolListar[];
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

  onCrearRol(){
    this.dialog.open(RolModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerRoles();
    });
  }

  onEditarRol(rol: RolListar){
    let rolEditar: RolEditar = rol as RolEditar;

    this.dialog.open(RolModalComponent, {
      disableClose: true,
      data: rolEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerRoles();
    });
  }

  onEliminarRol(rol: RolListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Rol', '¿Desea eliminar el Rol ' + rol.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._rolService.eliminar(rol.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Rol eliminado', 'Éxito');
              this.obtenerRoles();
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
