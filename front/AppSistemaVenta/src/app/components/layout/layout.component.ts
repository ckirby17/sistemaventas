import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionUsuario } from 'src/app/interfaces/auth/session-usuario';
import { MenuListar } from 'src/app/interfaces/models/menu-listar';
import { MenuRolListar } from 'src/app/interfaces/models/menu-rol-listar';
import { SubMenuListar } from 'src/app/interfaces/models/sub-menu-listar';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { MenuRolService } from 'src/app/services/api/menu-rol.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  sessionUsuario: SessionUsuario;
  listaMenus: MenuListar[] = [];
  listaRolMenus: MenuRolListar[] = [];

  constructor(
    private router: Router,
    private _authService: AuthenticationService,
    private _rolMenuService: MenuRolService,
    private _snackService: SnackbarService
  ){
    this.sessionUsuario = this._authService.obtenerSesionUsuario();
  }

  ngOnInit(): void {
    this.obtenerRolMenus();
  }

  obtenerRolMenus(){
    this._rolMenuService.obtenerMenusPorRol(this.sessionUsuario.rol.id).subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this.listaRolMenus = resp.dato as MenuRolListar[];
          this.listaMenus = this.listaRolMenus.map(data => {
            return data.menu;
          });
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

  obtenerMenusFiltroPorNivelCeroConUrl(subMenu: SubMenuListar[]): SubMenuListar[] {
    return subMenu.filter(sm => sm.nivel === 0 && sm.url !== '#').sort((a, b) => {
      if(a.orden < b.orden) return -1
      else if(a.orden > b.orden) return 1
      else return 0
    });
  }

  obtenerMenusFiltroPorNivelCeroSinUrl(subMenu: SubMenuListar[]): SubMenuListar[] {
    return subMenu.filter(sm => sm.nivel === 0 && sm.url === '#').sort((a, b) => {
      if(a.orden < b.orden) return -1
      else if(a.orden > b.orden) return 1
      else return 0
    });
  }

  obtenerMenusFiltroPorNivelUnoConUrl(subMenu: SubMenuListar[]): SubMenuListar[] {
    return subMenu.filter(sm => sm.nivel === 1 && sm.url !== '#').sort((a, b) => {
      if(a.orden < b.orden) return -1
      else if(a.orden > b.orden) return 1
      else return 0
    });
  }

  onLogout(){
    this._authService.removeSessionUsuario();
    this.router.navigate(['/']);
  }
}
