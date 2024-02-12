import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoPagoListar } from 'src/app/interfaces/models/tipo-pago-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { TipoPagoService } from 'src/app/services/api/tipo-pago.service';
import { PagoModalComponent } from '../../dialogs/pago/pago-modal/pago-modal.component';
import { TipoPagoEditar } from 'src/app/interfaces/models/tipo-pago-editar';

@Component({
  selector: 'app-tipo-pago',
  templateUrl: './tipo-pago.component.html',
  styleUrls: ['./tipo-pago.component.scss']
})
export class TipoPagoComponent implements OnInit {

  columnasTabla: string[] = ['nombre', 'sigla' , 'esActivoTexto', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  dataPago: TipoPagoListar[] = [];
  dataTablaSource!: MatTableDataSource<TipoPagoListar>;

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarLoading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private _pagoService: TipoPagoService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.dataTablaSource = new MatTableDataSource<TipoPagoListar>(this.dataPago);
  }

  ngOnInit(): void {
    this.obtenerPagos();
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerPagos(){
    this.mostrarLoading = true;
    this._pagoService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.dataTablaSource.data = resp.dato as TipoPagoListar[];
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

  onCrearPago(){
    this.dialog.open(PagoModalComponent, {
      disableClose: true,
      data: null
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerPagos();
    });
  }

  onEditarPago(pago: TipoPagoListar){
    let pagoEditar: TipoPagoEditar = pago as TipoPagoEditar;

    this.dialog.open(PagoModalComponent, {
      disableClose: true,
      data: pagoEditar
    }).afterClosed().subscribe((resp) => {
      if(resp == 'true') this.obtenerPagos();
    });
  }

  onEliminarPago(pago: TipoPagoListar){
    this._sweetService.mostrarDialogoConsulta('Eliminar Pago', '¿Desea eliminar el Pago ' + pago.nombre + '?')
    .then((result) => {
      if(result.isConfirmed){
        this._pagoService.eliminar(pago.id).subscribe({
          next: resp => {
            if(resp.exito == 1){
              this._snackService.mostrarSnackBarExito('Pago eliminado', 'Éxito');
              this.obtenerPagos();
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
