import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListar } from 'src/app/interfaces/models/menu-listar';
import { MenuRolCrear } from 'src/app/interfaces/models/menu-rol-crear';
import { MenuRolListar } from 'src/app/interfaces/models/menu-rol-listar';
import { RolListar } from 'src/app/interfaces/models/rol-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { SweetAlertService } from 'src/app/services/alert/sweet-alert.service';
import { MenuRolService } from 'src/app/services/api/menu-rol.service';
import { MenuService } from 'src/app/services/api/menu.service';
import { RolService } from 'src/app/services/api/rol.service';

@Component({
  selector: 'app-rol-menu',
  templateUrl: './rol-menu.component.html',
  styleUrls: ['./rol-menu.component.scss']
})
export class RolMenuComponent implements OnInit {

  columnasTabla: string[] = ['nombre', 'icono', 'url', 'fechaCreacion', 'fechaActualizacion', 'acciones'];
  formRolMenus: FormGroup;
  listaRoles: RolListar[] = [];
  listaRolMenus: MenuRolListar[] = [];
  listaMenus: MenuListar[] = [];
  listaMenusSel: MenuListar[] = [];
  listaMenusTabla: MenuListar[] = [];
  rolSeleccionado!: RolListar;

  dataTablaSource!: MatTableDataSource<MenuListar>;
  mostrarLoading: boolean = false;

  listaRolMenuCrear: MenuRolCrear[] = [];

  constructor(
    private fb: FormBuilder,
    private _rolService: RolService,
    private _rolMenuService: MenuRolService,
    private _menuService: MenuService,
    private _snackService: SnackbarService,
    private _sweetService: SweetAlertService
  ){
    this.formRolMenus = this.fb.group({
      rol: ['', Validators.required]
    });
    this.obtenerMenus();
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }

  onCambioCheckBox(menu: MenuListar){
    menu.seleccionado = menu.seleccionado ? false : true;
  }

  onCambioCheckBoxCabecera(evento: MatCheckboxChange){
    this.listaMenusTabla.map((data) => {
      return data.seleccionado = evento.checked;
    });
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

  obtenerRoles(){
    this._rolService.listar().subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.listaRoles = resp.dato as RolListar[];
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

  onCambioRol(){
    this.listaMenusTabla = [];
    if(this.rolSeleccionado !== null && this.rolSeleccionado){
      this.obtenerRolMenus(this.rolSeleccionado.id);
    }
  }

  obtenerRolMenus(rolId: number){
    this.mostrarLoading = true;
    this._rolMenuService.obtenerMenusPorRol(rolId).subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          const listaRolMenus = resp.dato as MenuRolListar[];
          this.listaRolMenus = listaRolMenus;
          this.listaMenusSel = listaRolMenus.map((item) => item.menu) as MenuListar[];

          this.listaMenusSel.map((item) => {
            return item.seleccionado = true
          });

          this.listaMenus.map((item) => {
            let menuEncontrado = this.listaMenusSel.find(data => data.id == item.id && data.seleccionado);
            if(menuEncontrado !== undefined){
              item.seleccionado = true;
            }
            else{
              item.seleccionado = false;
            }

            return item;
          });

          this.listaMenusTabla = this.listaMenus;
        }
        else{
          this._snackService.mostrarSnackBarError(resp.mensaje, 'Error');
        }
      },
      complete: () =>{
        this.dataTablaSource = new MatTableDataSource<MenuListar>(this.listaMenusTabla);
        this.mostrarLoading = false;
      },
      error: () => {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
        this.mostrarLoading = false;
      }
    });
  }

  onGuardarRolMenu(){
    this.mostrarLoading = true;
    this.listaRolMenuCrear = [];
    let listaMenuSelGuardar = this.listaMenusTabla.filter(data => data.seleccionado);

    listaMenuSelGuardar.forEach(data => {
      let rolMenuCrear: MenuRolCrear = {
        menuId: data.id,
        rolId: this.rolSeleccionado.id
      };

      this.listaRolMenuCrear.push(rolMenuCrear);
    });

    if(this.listaRolMenuCrear.length === 0){
      const rolMenuCrear: MenuRolCrear = {
        menuId: 0,
        rolId: this.rolSeleccionado.id
      };

      this.listaRolMenuCrear.push(rolMenuCrear);
    }

    this._rolMenuService.registrar(this.listaRolMenuCrear).subscribe({
      next: (resp) => {
        if (resp.exito === 1){
          this._sweetService.mostrarDialogoExito('Éxito!', 'Registros guardados correctamente');
        }
        else{
          this._sweetService.mostrarDialogoError('Error!', resp.mensaje);
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: ()=> {
        this._snackService.mostrarSnackBarError('Error en el sistema, por favor intente más tarde', 'Error');
        this.mostrarLoading = false;
      }
    });
  }

}
