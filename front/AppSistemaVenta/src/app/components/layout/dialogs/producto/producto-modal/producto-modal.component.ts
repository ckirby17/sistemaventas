import { formatNumber } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CategoriaListar } from 'src/app/interfaces/models/categoria-listar';
import { ProductoCrear } from 'src/app/interfaces/models/producto-crear';
import { ProductoEditar } from 'src/app/interfaces/models/producto-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { CategoriaService } from 'src/app/services/api/categoria.service';
import { ProductoService } from 'src/app/services/api/producto.service';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.scss']
})
export class ProductoModalComponent implements OnInit {

  formProducto: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: ProductoCrear;
  dataEditar!: ProductoEditar;
  nombreEsActivado: string = 'Inactivar';
  isChecked: boolean = true;
  listaCategorias: CategoriaListar[] = [];

  constructor(
    private modal: MatDialogRef<ProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private _snackService: SnackbarService
  ){
    this.formProducto = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      precioCosto: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9.]+$')]],
      precioVenta: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9.]+$')]],
      stockMinimo: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9.]+$')]],
      stockActual: ['', [Validators.required, Validators.min(1), Validators.pattern('^[0-9.]+$')]],
      esActivo: [true],
      categoriaId: ['', [Validators.required]]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as ProductoEditar;
    }
    else{
      this.dataCrear = this.data as ProductoCrear;
    }
  }

  ngOnInit(): void {
    this.obtenerCategorias();

    if(this.data !== null)
    {
      this.formProducto.setValue({
        nombre: this.dataEditar.nombre,
        precioCosto: this.dataEditar.precioCosto,
        precioVenta: this.dataEditar.precioVenta,
        stockMinimo: this.dataEditar.stockMinimo,
        stockActual: this.dataEditar.stockActual,
        categoriaId: this.dataEditar.categoriaId.toString(),
        esActivo: this.dataEditar.esActivo
      });

      this.cambiarNombreEsActivado(this.dataEditar.esActivo);
    }
  }

  onInputFormatNumber(evento: any, control: any){
    let inputValue = (evento.target.value) as string;
    inputValue = inputValue.replace(/[^0-9]/g, '');
    if(control.status === 'VALID'){
      const numeroFormateado: string = formatNumber(parseInt(inputValue), 'es-CL', '1.0-2');
      control.setValue(numeroFormateado);
    }
    else{
      control.setValue(inputValue);
    }
  }

  onChangeSlideToggle(evento: MatSlideToggleChange)
  {
    this.cambiarNombreEsActivado(evento.checked);
    this.isChecked = evento.checked;
  }

  cambiarNombreEsActivado(activate: boolean){
    this.nombreEsActivado = activate ? 'Inactivar' : 'Activar';
  }

  onSalvar(){
    if(this.data !== null){
      this.dataEditar.id = this.data.id;
      this.dataEditar.nombre = this.formProducto.value.nombre;
      this.dataEditar.precioCosto = this.formProducto.value.precioCosto;
      this.dataEditar.precioVenta = this.formProducto.value.precioVenta;
      this.dataEditar.stockMinimo = this.formProducto.value.stockMinimo;
      this.dataEditar.stockActual = this.formProducto.value.stockActual;
      this.dataEditar.categoriaId = this.formProducto.value.categoriaId;
      this.dataEditar.esActivo = this.isChecked;
      this.editarProducto(this.dataEditar);
    }
    else{
      this.dataCrear = this.formProducto.value as ProductoCrear;
      this.crearProducto(this.dataCrear);
    }
  }

  crearProducto(producto: ProductoCrear){
    this._productoService.crear(producto).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Producto creado correctamente', 'Éxito');
          this.modal.close('true');
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error sistema, intente más tarde', 'Error');
      }
    });
  }

  editarProducto(producto: ProductoEditar){
    this._productoService.editar(producto).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Producto actualizado correctamente', 'Éxito');
          this.modal.close('true');
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error sistema, intente más tarde', 'Error');
      }
    });
  }

  obtenerCategorias(){
    this._categoriaService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.listaCategorias = resp.dato as CategoriaListar[];
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error sistema, intente más tarde', 'Error');
      }
    });
  }

}
