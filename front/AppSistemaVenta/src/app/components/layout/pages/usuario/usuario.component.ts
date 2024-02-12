import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioListar } from 'src/app/interfaces/models/usuario-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { UsuarioService } from 'src/app/services/api/usuario.service';
import { UsuarioModalComponent } from '../../dialogs/usuario/usuario-modal/usuario-modal.component';
import { UsuarioEditar } from 'src/app/interfaces/models/usuario-editar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'apellido', 'correo', 'rolNombre', 'esActivoTexto', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataUsuario: UsuarioListar[] = [];
  dataTablaSource!: MatTableDataSource<UsuarioListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _usuarioService: UsuarioService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<UsuarioListar>(this.dataUsuario);
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerUsuarios(){
    this.mostrarLoading = true;
    this._usuarioService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as UsuarioListar[];
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

  onCrearUsuario(){
    this.dialog.open(UsuarioModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerUsuarios();
    });
  }

  onEditarUsuario(usuario: UsuarioListar){
    let usuarioEditar: UsuarioEditar = usuario as UsuarioEditar;

    this.dialog.open(UsuarioModalComponent, {
      disableClose: true,
      data: usuarioEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerUsuarios();
    });
  }

  onEliminarUsuario(usuario: UsuarioListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Usuario', '¿Desea eliminar el Usuario ' + usuario.nombre + ' ' + usuario.apellido + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._usuarioService.eliminar(usuario.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Usuario eliminado', 'Éxito');
              this.obtenerUsuarios();
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
