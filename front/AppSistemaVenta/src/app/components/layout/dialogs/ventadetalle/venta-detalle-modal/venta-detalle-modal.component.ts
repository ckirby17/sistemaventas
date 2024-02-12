import { formatNumber } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { VentaDetalleListar } from 'src/app/interfaces/models/venta-detalle-listar';
import { VentaListar } from 'src/app/interfaces/models/venta-listar';

@Component({
  selector: 'app-venta-detalle-modal',
  templateUrl: './venta-detalle-modal.component.html',
  styleUrls: ['./venta-detalle-modal.component.scss']
})
export class VentaDetalleModalComponent implements OnInit {

  columnasTabla: string[] = ['descripcion', 'cantidad', 'precio', 'total'];
  columnasTablaFooter: string[] = ['descripcion', 'precio', 'total'];
  formVenta: FormGroup;

  listaDetalleVenta: VentaDetalleListar[] = [];

  dataTablaSource!: MatTableDataSource<VentaDetalleListar>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VentaListar,
    private fb: FormBuilder
  ){
    this.formVenta = this.fb.group({
      numeroDocumento: [data.numeroDocumento],
      tipoPagoSigla: [data.tipoPagoSigla],
      tipoDocumentoSigla: [data.tipoDocumentoSigla],
      neto: [data.neto],
      iva: [data.iva],
      total: [data.total],
      fecha: [data.fechaCreacion]
    });

    this.dataTablaSource = new MatTableDataSource<VentaDetalleListar>(this.listaDetalleVenta);
  }

  ngOnInit(): void {
    this.listaDetalleVenta = this.data.ventaDetalles as VentaDetalleListar[];
    this.dataTablaSource.data = this.listaDetalleVenta;
  }

  obtenerSumatoriaTotal() {
    const sumaTotal = this.listaDetalleVenta.map((item) => parseFloat(item.total.replace(/[^0-9]/g, '')))
    .reduce((acc, value) => acc + value, 0);

    return formatNumber(sumaTotal, 'es-CL', '1.0-2');
  }

  obtenerSumatoriaPrecio(){
    const sumaPrecioTotal = this.listaDetalleVenta.map((item) => parseFloat(item.precio.replace(/[^0-9]/g, '')))
    .reduce((acc, value) => acc + value, 0);

    return formatNumber(sumaPrecioTotal, 'es-CL', '1.0-2');
  }

}
