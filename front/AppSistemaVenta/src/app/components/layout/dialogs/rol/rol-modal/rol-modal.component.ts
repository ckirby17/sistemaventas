import { RolEditar } from 'src/app/interfaces/models/rol-editar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolService } from 'src/app/services/api/rol.service';
import { RolCrear } from 'src/app/interfaces/models/rol-crear';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';

@Component({
  selector: 'app-rol-modal',
  templateUrl: './rol-modal.component.html',
  styleUrls: ['./rol-modal.component.scss']
})
export class RolModalComponent implements OnInit {

  formRol: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: RolCrear;
  dataEditar!: RolEditar;

  constructor(
    private modal: MatDialogRef<RolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _rolService: RolService,
    private _snackService: SnackbarService
  ){
    this.formRol = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as RolEditar;
    }
    else{
      this.dataCrear = this.data as RolCrear;
    }
  }

  ngOnInit(): void {
    if(this.data !== null){
      this.formRol.setValue({
        nombre: this.dataEditar.nombre
      });
    }
  }

  onSalvar(){
    if(this.data !== null){
      this.dataEditar.id = this.data.id;
      this.dataEditar.nombre = this.formRol.value.nombre;
      this.editarRol(this.dataEditar);
    }
    else{
      this.dataCrear = this.formRol.value as RolCrear;
      this.crearRol(this.dataCrear);
    }

  }

  crearRol(rol: RolCrear){
    this._rolService.crear(rol).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Rol creado correctamente', 'Éxito');
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

  editarRol(rol: RolEditar){
    this._rolService.editar(rol).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Rol actualizado correctamente', 'Éxito');
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
