import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaListar } from 'src/app/interfaces/models/categoria-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { CategoriaService } from 'src/app/services/api/categoria.service';
import { CategoriaModalComponent } from '../../dialogs/categoria/categoria-modal/categoria-modal.component';
import { CategoriaEditar } from 'src/app/interfaces/models/categoria-editar';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['nombre', 'esActivo', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataCategoria: CategoriaListar[] = [];
  dataTablaSource!: MatTableDataSource<CategoriaListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _categoriaService: CategoriaService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<CategoriaListar>(this.dataCategoria);
  }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerCategorias(){
    this.mostrarLoading = true;
    this._categoriaService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as CategoriaListar[];
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

  onCrearCategoria(){
    this.dialog.open(CategoriaModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerCategorias();
    });
  }

  onEditarCategoria(categoria: CategoriaListar){
    let categoriaEditar: CategoriaEditar = categoria as CategoriaEditar;

    this.dialog.open(CategoriaModalComponent, {
      disableClose: true,
      data: categoriaEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerCategorias();
    });
  }

  onEliminarCategoria(categoria: CategoriaListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Categoria', '¿Desea eliminar la Categoria ' + categoria.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._categoriaService.eliminar(categoria.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Categoria eliminada', 'Éxito');
              this.obtenerCategorias();
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
