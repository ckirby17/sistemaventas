import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CategoriaCrear } from 'src/app/interfaces/models/categoria-crear';
import { CategoriaEditar } from 'src/app/interfaces/models/categoria-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { CategoriaService } from 'src/app/services/api/categoria.service';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.scss']
})
export class CategoriaModalComponent implements OnInit {

  formCategoria: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: CategoriaCrear;
  dataEditar!: CategoriaEditar;
  nombreEsActivado: string = 'Inactivar';
  isChecked: boolean = true;


  constructor(
    private modal: MatDialogRef<CategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private _snackService: SnackbarService
  ){
    this.formCategoria = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      esActivo: [this.isChecked]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as CategoriaEditar;
    }
    else{
      this.dataCrear = this.data as CategoriaCrear;
    }
  }

  ngOnInit(): void {
    if(this.data !== null){
      this.formCategoria.setValue({
        nombre: this.dataEditar.nombre,
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
      this.dataEditar.nombre = this.formCategoria.value.nombre;
      this.dataEditar.esActivo = this.isChecked;
      this.editarCategoria(this.dataEditar);
    }
    else{
      this.dataCrear = this.formCategoria.value as CategoriaCrear;
      this.crearCategoria(this.dataCrear);
    }

  }

  crearCategoria(categoria: CategoriaCrear){
    this._categoriaService.crear(categoria).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Categoria creada correctamente', 'Éxito');
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

  editarCategoria(categoria: CategoriaEditar){
    this._categoriaService.editar(categoria).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Categoria actualizada correctamente', 'Éxito');
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
