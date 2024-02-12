import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuCrear } from 'src/app/interfaces/models/menu-crear';
import { MenuEditar } from 'src/app/interfaces/models/menu-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { MenuService } from 'src/app/services/api/menu.service';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.scss']
})
export class MenuModalComponent implements OnInit {

  formMenu: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: MenuCrear;
  dataEditar!: MenuEditar;

  constructor(
    private modal: MatDialogRef<MenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _menuService: MenuService,
    private _snackService: SnackbarService
  ){
    this.formMenu = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      icono: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', [Validators.required, Validators.maxLength(50)]],
      orden: [0, [Validators.required]]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as MenuEditar;
    }
    else{
      this.dataCrear = this.data as MenuCrear;
    }
  }

  ngOnInit(): void {
    if(this.data !== null){
      this.formMenu.setValue({
        nombre: this.dataEditar.nombre,
        icono: this.dataEditar.icono,
        url: this.dataEditar.url,
        orden: this.dataEditar.orden
      });
    }
  }

  onSalvar(){
    if(this.data !== null){
      this.dataEditar.id = this.data.id;
      this.dataEditar.nombre = this.formMenu.value.nombre;
      this.dataEditar.icono = this.formMenu.value.icono;
      this.dataEditar.url = this.formMenu.value.url;
      this.dataEditar.orden = this.formMenu.value.orden;
      this.editarMenu(this.dataEditar);
    }
    else{
      this.dataCrear = this.formMenu.value as MenuCrear;
      this.crearMenu(this.dataCrear);
    }
  }

  crearMenu(menu: MenuCrear){
    this._menuService.crear(menu).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Menú creado correctamente', 'Éxito');
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

  editarMenu(menu: MenuEditar){
    this._menuService.editar(menu).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Menú actualizado correctamente', 'Éxito');
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
