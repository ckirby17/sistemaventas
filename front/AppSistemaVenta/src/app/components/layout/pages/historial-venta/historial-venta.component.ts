import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HistorialVenta } from 'src/app/interfaces/models/historial-venta';
import { VentaListar } from 'src/app/interfaces/models/venta-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { VentaService } from 'src/app/services/api/venta.service';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD-MM-YYYY'
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-historial-venta',
  templateUrl: './historial-venta.component.html',
  styleUrls: ['./historial-venta.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
    { provide: MAT_DATE_LOCALE, useValue: 'es-CL' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
  ]
})
export class HistorialVentaComponent implements OnInit {

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filtroBusqueda: any = [
    { valor: 'PorNumero', descripcion: 'Número de documento' },
    { valor: 'PorFechas', descripcion: 'Rango de fechas' }
  ];

  formBusqueda: FormGroup;
  listaVentas: VentaListar[] = [];
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _ventaService: VentaService,
    private _snackService: SnackbarService
  ){
    this.formBusqueda = this.fb.group({
      busquedaPor: ['PorNumero'],
      numeroDocumento: ['', [Validators.required, Validators.min(1)]],
      fechaInicio: [''],
      fechaFin: ['']
    });
  }

  ngOnInit(): void {

  }

  onCambioFiltroBusqueda(valor: string){
    this.listaVentas = [];
    this.formBusqueda.patchValue({
      numeroDocumento: 0,
      fechaInicio: '',
      fechaFin: ''
    });
    if(valor === 'PorNumero'){
      this.formBusqueda.get('fechaInicio')?.clearValidators();
      this.formBusqueda.get('fechaFin')?.clearValidators();
      this.formBusqueda.get('numeroDocumento')?.setValidators([Validators.required, Validators.min(1)]);
    }
    else{
      this.formBusqueda.get('fechaInicio')?.setValidators([Validators.required]);
      this.formBusqueda.get('fechaFin')?.setValidators([Validators.required]);
      this.formBusqueda.get('numeroDocumento')?.clearValidators();
    }

    this.actualizarFormularioBusqueda();
  }

  actualizarFormularioBusqueda(){
    this.formBusqueda.get('fechaInicio')?.updateValueAndValidity();
    this.formBusqueda.get('fechaFin')?.updateValueAndValidity();
    this.formBusqueda.get('numeroDocumento')?.updateValueAndValidity();
  }

  buscarVentas(){
    this.mostrarLoading = true;
    this.listaVentas = [];
    let filtroBusqueda: HistorialVenta = {
      numeroDocumento: this.formBusqueda.value.numeroDocumento,
      fechaInicio: new Date(this.formBusqueda.get('fechaInicio')?.value._d).toLocaleDateString('es-CL'),
      fechaFin: new Date(this.formBusqueda.get('fechaFin')?.value._d).toLocaleDateString('es-CL'),
    };

    this._ventaService.obtenerHistorial(filtroBusqueda).subscribe({
      next: (resp) => {
        if(resp.exito === 1){
          this.listaVentas = resp.dato as VentaListar[];
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

}
