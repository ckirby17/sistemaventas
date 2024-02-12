import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { CategoriaListar } from 'src/app/interfaces/models/categoria-listar';
import { ProductoListar } from 'src/app/interfaces/models/producto-listar';
import { TipoDocumentoListar } from 'src/app/interfaces/models/tipo-documento-listar';
import { TipoPagoListar } from 'src/app/interfaces/models/tipo-pago-listar';
import { VentaCrear } from 'src/app/interfaces/models/venta-crear';
import { VentaDetalleCrear } from 'src/app/interfaces/models/venta-detalle-crear';
import { VentaListar } from 'src/app/interfaces/models/venta-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { CategoriaService } from 'src/app/services/api/categoria.service';
import { TipoDocumentoService } from 'src/app/services/api/tipo-documento.service';
import { TipoPagoService } from 'src/app/services/api/tipo-pago.service';
import { VentaService } from 'src/app/services/api/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  formDetalleVenta!: FormGroup;
  columnasTabla: string[] = ['descripcion', 'cantidad', 'precio', 'total', 'acciones'];

  netoValor: string = '0';
  ivaValor: string = '0';
  totalValor: string = '0';

  listaPagos: TipoPagoListar[] = [];
  listaDocumentos: TipoDocumentoListar[] = [];
  listaProductos: ProductoListar[] = [];
  listaCategorias: CategoriaListar[] = [];
  listaCategoriaObservable!: Observable<CategoriaListar[]>;
  listaDetalleVenta: VentaDetalleCrear[] = [];

  productoSeleccionado!: ProductoListar;

  dataTablaSource!: MatTableDataSource<VentaDetalleCrear>;

  botonRegistrarBloqueado: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private _pagoService: TipoPagoService,
    private _docService: TipoDocumentoService,
    private _ventaService: VentaService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.formDetalleVenta = this.fb.group({
      producto: ['', Validators.required],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      tipoPago: ['', Validators.required],
      tipoDocumento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.obtenerListaCategorias();
    this.obtenerListaPagos();
    this.obtenerListaDocumentos();

    this.formDetalleVenta.get('tipoPago')?.valueChanges.subscribe({
      next: (valor) => {
        if(valor !== ''){
          this.botonRegistrarBloqueado = false;
        }
        else{
          this.botonRegistrarBloqueado = true;
        }
      }
    });

    this.formDetalleVenta.get('tipoDocumento')?.valueChanges.subscribe({
      next: (valor) => {
        if(valor !== ''){
          this.botonRegistrarBloqueado = false;
        }else{
          this.botonRegistrarBloqueado = true;
        }
      }
    });
  }

  obtenerListaCategorias(): void {
    this._categoriaService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.listaCategorias = resp.dato as CategoriaListar[];

          this.listaCategoriaObservable = this.formDetalleVenta.get('producto')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filtarCategorias(value || '')),
          );
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
      }
    });
  }

  obtenerListaPagos(): void {
    this._pagoService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          const listaPagoFiltrado = resp.dato as TipoPagoListar[];
          this.listaPagos = listaPagoFiltrado.filter(pago => pago.esActivo);
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
      }
    });
  }

  obtenerListaDocumentos(): void {
    this._docService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          const listaDocFiltrado = resp.dato as TipoDocumentoListar[];
          this.listaDocumentos = listaDocFiltrado.filter(doc => doc.esActivo);
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
      }
    });
  }

  private _filtarCategorias(valor: any): CategoriaListar[] {

    const valorNuevo = typeof valor === 'string' ? valor.toLowerCase() : valor.nombre.toLowerCase();

    const listFiltroCat = this.listaCategorias
    .map((categoria: CategoriaListar) => ({
      id: categoria.id,
      nombre: categoria.nombre,
      esActivo: categoria.esActivo,
      esActivoTexto: categoria.esActivoTexto,
      fechaCreacion: categoria.fechaCreacion,
      fechaActualizacion: categoria.fechaActualizacion,
      productos: this._filtrarProductos(categoria.productos, valorNuevo)
    }))
    .filter(categoria => categoria.productos.length > 0);

    return listFiltroCat;
  }

  private _filtrarProductos(productos: ProductoListar[], valor: string): ProductoListar[] {

    return productos.filter(prod => prod.nombre.toLowerCase().includes(valor) && prod.esActivo && parseInt(prod.stockActual) > 0);
  }

  productoSeleccionadoCombo(evento: any){
    this.productoSeleccionado = evento.option.value;
  }

  mostrarProducto(producto: ProductoListar) : string{
    return producto.nombre;
  }

  onAgregarDetalleVenta() {
    if(this._validarStockProductoSeleccionado()){
      this._calcularPreciosTotales();
      this._agregarObjetoDetalleVenta();
    }
  }

  private _validarStockProductoSeleccionado(): boolean {
    const sotckAux: number = parseFloat(this.productoSeleccionado.stockActual.replace(/[^0-9]/g, '')) - this.formDetalleVenta.value.cantidad;
    const stokMinimo: number = parseFloat(this.productoSeleccionado.stockMinimo.replace(/[^0-9]/g, ''));

    if(sotckAux <= stokMinimo ){
      this._sweetService.mostrarDialogoPeligro('Stock Mínimo', 'No se puede agregar el producto con la cantidad ingresada, por falta de stock. El stock actual es de ' +
      this.productoSeleccionado.stockActual +
      '. El stock mínimo es: ' + this.productoSeleccionado.stockMinimo);
      return false;
    }

    return true;
  }

  private _calcularPreciosTotales() {
    const precioVenta: number = parseFloat(this.productoSeleccionado.precioVenta.replace(/[^0-9]/g, ''));

    const procentajeIva: number = 0.19;
    const valorTotalNeto: number = parseFloat(this.netoValor.replace(/[^0-9]/g, '')) + (precioVenta * this.formDetalleVenta.value.cantidad);
    const valorTotalIva: number = Math.round((valorTotalNeto * procentajeIva));
    const valorTotal: number = valorTotalNeto + valorTotalIva;

    this.netoValor = formatNumber(valorTotalNeto, 'es-CL', '1.0-2');
    this.ivaValor = formatNumber(valorTotalIva, 'es-CL', '1.0-2');
    this.totalValor = formatNumber(valorTotal, 'es-CL', '1.0-2');
  }

  private _reCalcularPreciosTotales(ventaDetalle: VentaDetalleCrear){
    const procentajeIva: number = 0.19;
    const valorTotalNeto: number = parseFloat(this.netoValor.replace(/[^0-9]/g, '')) - parseFloat(ventaDetalle.total.replace(/[^0-9]/g, ''));
    const valorTotalIva: number = Math.round(valorTotalNeto * procentajeIva);
    const valorTotal: number = valorTotalNeto + valorTotalIva;

    this.netoValor = formatNumber(valorTotalNeto, 'es-CL', '1.0-2');
    this.ivaValor = formatNumber(valorTotalIva, 'es-CL', '1.0-2');
    this.totalValor = formatNumber(valorTotal, 'es-CL', '1.0-2');
  }

  private _agregarObjetoDetalleVenta(){

    this.listaDetalleVenta.push({
      productoId: this.productoSeleccionado.id,
      descripcion: this.productoSeleccionado.nombre,
      cantidad: this.formDetalleVenta.value.cantidad,
      precio: this.productoSeleccionado.precioVenta,
      total: formatNumber(this.formDetalleVenta.value.cantidad * parseFloat(this.productoSeleccionado.precioVenta.replace(/[^0-9]/g, '')), 'es-CL', '1.0-2')
    });

    this.dataTablaSource = new MatTableDataSource<VentaDetalleCrear>(this.listaDetalleVenta);

    this.formDetalleVenta.patchValue({
      producto: '',
      cantidad: 0
    });
  }

  onEliminarDetalleVenta(ventaDetalle: VentaDetalleCrear, index: any){

    this.listaDetalleVenta.splice(index, 1);
    let copiaListaDetalleVenta= [...this.listaDetalleVenta];
    this.listaDetalleVenta = copiaListaDetalleVenta;

    this.dataTablaSource = new MatTableDataSource<VentaDetalleCrear>(this.listaDetalleVenta);

    this._reCalcularPreciosTotales(ventaDetalle);
  }

  registrarVenta(){
    this.mostrarLoading = true;

    const objVenta: VentaCrear = {
      neto: this.netoValor,
      iva: this.ivaValor,
      total: this.totalValor,
      tipoDocumentoId: this.formDetalleVenta.value.tipoDocumento,
      tipoPagoId: this.formDetalleVenta.value.tipoPago,
      ventaDetalles: this.listaDetalleVenta
    };

    this._ventaService.registrar(objVenta).subscribe({
      next: (resp) => {
        if(resp.exito === 1){
          const respObjeto = resp.dato as VentaListar;
          this._sweetService.mostrarDialogoExito('Éxito', 'Venta registrada correctamente, N° Documento: ' + respObjeto.numeroDocumento);
          this.listaDetalleVenta = [];
          this.netoValor = '0';
          this.ivaValor = '0';
          this.totalValor = '0';
          this.formDetalleVenta.patchValue({
            producto: '',
            cantidad: 0,
            tipoPago: '',
            tipoDocumento: ''
          });
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

