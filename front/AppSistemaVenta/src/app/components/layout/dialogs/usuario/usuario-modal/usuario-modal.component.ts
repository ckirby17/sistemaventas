import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { RolListar } from 'src/app/interfaces/models/rol-listar';
import { UsuarioCrear } from 'src/app/interfaces/models/usuario-crear';
import { UsuarioEditar } from 'src/app/interfaces/models/usuario-editar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { RolService } from 'src/app/services/api/rol.service';
import { UsuarioService } from 'src/app/services/api/usuario.service';

@Component({
  selector: 'app-usuario-modal',
  templateUrl: './usuario-modal.component.html',
  styleUrls: ['./usuario-modal.component.scss']
})
export class UsuarioModalComponent implements OnInit {

  formUsuario: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';
  dataCrear!: UsuarioCrear;
  dataEditar!: UsuarioEditar;
  nombreEsActivado: string = 'Inactivar';
  isChecked: boolean = true;
  listaRoles: RolListar[] = [];
  ocultarClave: boolean = true;

  constructor(
    private modal: MatDialogRef<UsuarioModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _rolService: RolService,
    private _snackService: SnackbarService
  ){
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      clave: ['', [Validators.required, Validators.maxLength(100)]],
      esActivo: [true],
      rolId: ['', [Validators.required]]
    });

    if(data !== null){
      this.tituloAccion = 'Editar';
      this.botonAccion = 'Actualizar';
      this.dataEditar = this.data as UsuarioEditar;
    }
    else{
      this.dataCrear = this.data as UsuarioCrear;
    }
  }

  ngOnInit(): void {
    this.obtenerRoles();

    if(this.data !== null){
      this.formUsuario.setValue({
        nombre: this.dataEditar.nombre,
        apellido: this.dataEditar.apellido,
        correo: this.dataEditar.correo,
        clave: this.dataEditar.clave,
        rolId: this.dataEditar.rolId.toString(),
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
      this.dataEditar.nombre = this.formUsuario.value.nombre;
      this.dataEditar.apellido = this.formUsuario.value.apellido;
      this.dataEditar.correo = this.formUsuario.value.correo;
      this.dataEditar.clave = this.formUsuario.value.clave;
      this.dataEditar.rolId = this.formUsuario.value.rolId;
      this.dataEditar.esActivo = this.isChecked;
      this.editarUsuario(this.dataEditar);
    }
    else{
      this.dataCrear = this.formUsuario.value as UsuarioCrear;
      this.crearUsuario(this.dataCrear);
    }
  }

  crearUsuario(usuario: UsuarioCrear){
    this._usuarioService.crear(usuario).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Usuario creado correctamente', 'Éxito');
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

  editarUsuario(usuario: UsuarioEditar){
    this._usuarioService.editar(usuario).subscribe({
      next: resp => {
        if(resp.exito == 1){
          this._snackService.mostrarSnackBarExito('Usuario actualizado correctamente', 'Éxito');
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
        this._snackService.mostrarSnackBarError('Error sistema, intente más tarde', 'Error');
      }
    });
  }

}
