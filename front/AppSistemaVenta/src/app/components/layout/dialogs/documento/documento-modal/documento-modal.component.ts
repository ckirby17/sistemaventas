import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { TipoDocumentoCrear } from 'src/app/interfaces/models/tipo-documento-crear';
import { TipoDocumentoEditar } from 'src/app/interfaces/models/tipo-documento-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { TipoDocumentoService } from 'src/app/services/api/tipo-documento.service';

@Component({
  selector: 'app-documento-modal',
  templateUrl: './documento-modal.component.html',
  styleUrls: ['./documento-modal.component.scss']
})
export class DocumentoModalComponent implements OnInit {

  formDocumento: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: TipoDocumentoCrear;
  dataEditar!: TipoDocumentoEditar;
  nombreEsActivado: string = 'Inactivar';
  isChecked: boolean = true;


  constructor(
    private modal: MatDialogRef<DocumentoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _documentoService: TipoDocumentoService,
    private _snackService: SnackbarService
  ){
    this.formDocumento = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      sigla: ['', [Validators.required, Validators.maxLength(3)]],
      esActivo: [this.isChecked]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as TipoDocumentoEditar;
    }
    else{
      this.dataCrear = this.data as TipoDocumentoCrear;
    }
  }

  ngOnInit(): void {
    if(this.data !== null){
      this.formDocumento.setValue({
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
      this.dataEditar.nombre = this.formDocumento.value.nombre;
      this.dataEditar.sigla = this.formDocumento.value.sigla;
      this.dataEditar.esActivo = this.isChecked;
      this.editarDocumento(this.dataEditar);
    }
    else{
      this.dataCrear = this.formDocumento.value as TipoDocumentoCrear;
      this.crearDocumento(this.dataCrear);
    }

  }

  crearDocumento(documento: TipoDocumentoCrear){
    this._documentoService.crear(documento).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Documento creado correctamente', 'Éxito');
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

  editarDocumento(documento: TipoDocumentoEditar){
    this._documentoService.editar(documento).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Documento actualizado correctamente', 'Éxito');
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
