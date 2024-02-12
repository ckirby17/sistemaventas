import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuListar } from 'src/app/interfaces/models/menu-listar';
import { SubMenuCrear } from 'src/app/interfaces/models/sub-menu-crear';
import { SubMenuEditar } from 'src/app/interfaces/models/sub-menu-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { MenuService } from 'src/app/services/api/menu.service';
import { SubMenuService } from 'src/app/services/api/sub-menu.service';

@Component({
  selector: 'app-sub-menu-modal',
  templateUrl: './sub-menu-modal.component.html',
  styleUrls: ['./sub-menu-modal.component.scss']
})
export class SubMenuModalComponent implements OnInit {

  formSubMenu: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: SubMenuCrear;
  dataEditar!: SubMenuEditar;
  listaMenus: MenuListar[] = [];

  constructor(
    private modal: MatDialogRef<SubMenuModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _subMenuService: SubMenuService,
    private _menuService: MenuService,
    private _snackService: SnackbarService
  ){
    this.formSubMenu = this.fb.group({
      menuId: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      icono: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', [Validators.required, Validators.maxLength(50)]],
      nivel: [0, [Validators.required]],
      orden: [0, [Validators.required]]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as SubMenuEditar;
    }
    else{
      this.dataCrear = this.data as SubMenuCrear;
    }
  }

  ngOnInit(): void {
    this.obtenerMenus();

    if(this.data !== null){
      this.formSubMenu.setValue({
        menuId: this.dataEditar.menuId,
        nombre: this.dataEditar.nombre,
        icono: this.dataEditar.icono,
        url: this.dataEditar.url,
        nivel: this.dataEditar.nivel,
        orden: this.dataEditar.orden
      });
    }
  }

  obtenerMenus(){
    this._menuService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.listaMenus = resp.dato as MenuListar[];
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

  onSalvar(){
    if(this.data !== null){
      this.dataEditar.id = this.data.id;
      this.dataEditar.menuId = this.formSubMenu.value.menuId;
      this.dataEditar.nombre = this.formSubMenu.value.nombre;
      this.dataEditar.icono = this.formSubMenu.value.icono;
      this.dataEditar.url = this.formSubMenu.value.url;
      this.dataEditar.nivel = this.formSubMenu.value.nivel;
      this.dataEditar.orden = this.formSubMenu.value.orden;
      this.editarSubMenu(this.dataEditar);
    }
    else{
      this.dataCrear = this.formSubMenu.value as SubMenuCrear;
      this.crearSubMenu(this.dataCrear);
    }
  }

  crearSubMenu(subMenu: SubMenuCrear){
    this._subMenuService.crear(subMenu).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Sub Menú creado correctamente', 'Éxito');
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

  editarSubMenu(subMenu: SubMenuEditar){
    this._subMenuService.editar(subMenu).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Sub Menú actualizado correctamente', 'Éxito');
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
