import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TipoPagoCrear } from 'src/app/interfaces/models/tipo-pago-crear';
import { TipoPagoEditar } from 'src/app/interfaces/models/tipo-pago-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { TipoPagoService } from 'src/app/services/api/tipo-pago.service';

@Component({
  selector: 'app-pago-modal',
  templateUrl: './pago-modal.component.html',
  styleUrls: ['./pago-modal.component.scss']
})
export class PagoModalComponent implements OnInit {

  formPago: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: TipoPagoCrear;
  dataEditar!: TipoPagoEditar;
  nombreEsActivado: string = 'Inactivar';
  isChecked: boolean = true;


  constructor(
    private modal: MatDialogRef<PagoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _pagoService: TipoPagoService,
    private _snackService: SnackbarService
  ){
    this.formPago = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      sigla: ['', [Validators.required, Validators.maxLength(3)]],
      esActivo: [this.isChecked]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as TipoPagoEditar;
    }
    else{
      this.dataCrear = this.data as TipoPagoCrear;
    }
  }

  ngOnInit(): void {
    if(this.data !== null){
      this.formPago.setValue({
        nombre: this.dataEditar.nombre,
        sigla: this.dataEditar.sigla,
        esActivo: this.dataEditar.esActivo
      });

      this.cambiarNombreEsActivado(this.dataEditar.esActivo);
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
      this.dataEditar.nombre = this.formPago.value.nombre;
      this.dataEditar.sigla = this.formPago.value.sigla;
      this.dataEditar.esActivo = this.isChecked;
      this.editarPago(this.dataEditar);
    }
    else{
      this.dataCrear = this.formPago.value as TipoPagoCrear;
      this.crearPago(this.dataCrear);
    }

  }

  crearPago(pago: TipoPagoCrear){
    this._pagoService.crear(pago).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Pago creado correctamente', 'Éxito');
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

  editarPago(pago: TipoPagoEditar){
    this._pagoService.editar(pago).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Pago actualizado correctamente', 'Éxito');
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

}
