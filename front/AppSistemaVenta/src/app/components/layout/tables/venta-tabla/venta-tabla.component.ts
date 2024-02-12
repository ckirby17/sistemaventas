import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { VentaListar } from 'src/app/interfaces/models/venta-listar';
import { VentaDetalleModalComponent } from '../../dialogs/ventadetalle/venta-detalle-modal/venta-detalle-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-venta-tabla',
  templateUrl: './venta-tabla.component.html',
  styleUrls: ['./venta-tabla.component.scss']
})
export class VentaTablaComponent implements OnInit, AfterViewInit {

  columnasTabla: string[] = ['numeroDocumento', 'tipoPagoSigla', 'tipoDocumentoSigla', 'neto', 'iva', 'total', 'fecha' , 'acciones'];
  columnasTablaFooter: string[] = ['numeroDocumento', 'neto', 'iva', 'total'];

  @Input() dataOrigen: VentaListar[] = [];

  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private listaVentaInicial: VentaListar[] = [];
  dataTablaSource!: MatTableDataSource<VentaListar>;


  constructor(private dialog: MatDialog){
    this.dataTablaSource = new MatTableDataSource<VentaListar>(this.listaVentaInicial);
  }

  ngOnInit(): void {
    this.dataTablaSource.data = this.dataOrigen;
  }

  ngAfterViewInit(): void {
    this.dataTablaSource.paginator = this.paginacionTabla;
    this.dataTablaSource.sort = this.sort;
  }

  obtenerSumatoriaNeto(){
    const sumaNetoTotal = this.dataOrigen.map((item) => parseFloat(item.neto.replace(/[^0-9]/g, '')))
    .reduce((acc, value) => acc + value, 0);

    return formatNumber(sumaNetoTotal, 'es-CL', '1.0-2');
  }

  obtenerSumatoriaIva(){
    const sumaIvaTotal = this.dataOrigen.map((item) => parseFloat(item.iva.replace(/[^0-9]/g, '')))
    .reduce((acc, value) => acc + value, 0);

    return formatNumber(sumaIvaTotal, 'es-CL', '1.0-2');
  }

  obtenerSumatoriaTotal() {
    const sumaTotal = this.dataOrigen.map((item) => parseFloat(item.total.replace(/[^0-9]/g, '')))
    .reduce((acc, value) => acc + value, 0);

    return formatNumber(sumaTotal, 'es-CL', '1.0-2');
  }

  aplicarFiltroTabla(evento: Event){
    const filterValor = (evento.target as HTMLInputElement).value;
    this.dataTablaSource.filter = filterValor.trim().toLowerCase();

    if (this.dataTablaSource.paginator) {
      this.dataTablaSource.paginator.firstPage();
    }
  }

  onVerDetalleVentas(venta: VentaListar){
    this.dialog.open(VentaDetalleModalComponent, {
      data: venta,
      disableClose: true,
      width: '100%'
    });
  }

}
