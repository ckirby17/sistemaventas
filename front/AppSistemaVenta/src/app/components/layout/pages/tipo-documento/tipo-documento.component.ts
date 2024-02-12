import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoDocumentoListar } from 'src/app/interfaces/models/tipo-documento-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { TipoDocumentoService } from 'src/app/services/api/tipo-documento.service';
import { DocumentoModalComponent } from '../../dialogs/documento/documento-modal/documento-modal.component';
import { TipoDocumentoEditar } from 'src/app/interfaces/models/tipo-documento-editar';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {

  columnasTabla: string[] = ['nombre', 'sigla' , 'esActivoTexto', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataDocumento: TipoDocumentoListar[] = [];
  dataTablaSource!: MatTableDataSource<TipoDocumentoListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _documentoService: TipoDocumentoService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<TipoDocumentoListar>(this.dataDocumento);
  }

  ngOnInit(): void {
    this.obtenerDocumentos();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerDocumentos(){
    this.mostrarLoading = true;
    this._documentoService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as TipoDocumentoListar[];
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

  onCrearDocumento(){
    this.dialog.open(DocumentoModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerDocumentos();
    });
  }

  onEditarDocumento(documento: TipoDocumentoListar){
    let documentoEditar: TipoDocumentoEditar = documento as TipoDocumentoEditar;

    this.dialog.open(DocumentoModalComponent, {
      disableClose: true,
      data: documentoEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerDocumentos();
    });
  }

  onEliminarDocumento(documento: TipoDocumentoListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Documento', '¿Desea eliminar el Documento ' + documento.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._documentoService.eliminar(documento.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Documento eliminado', 'Éxito');
              this.obtenerDocumentos();
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
