import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionUsuario } from 'src/app/interfaces/auth/session-usuario';
import { Login } from 'src/app/interfaces/models/login';
import { SnackbarService } from 'src/app/services/alert/snackbar.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  ocultarClave: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _authService: AuthenticationService,
    private _alertService: SnackbarService
  ) {
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  onLogin(){
    this.mostrarLoading = true;

    const loginModel: Login = this.formLogin.value as Login;

    this._authService.loginAuthenticate(loginModel).subscribe({
      next: (resp) => {
        if(resp.exito == 1){
          this._alertService.mostrarSnackBarExito('Éxito', 'Acceso correcto al sistema');
          this._authService.guardarSesionUsuario(resp.dato as SessionUsuario);
          this.router.navigate(['pages']);
        }
        else{
          this._alertService.mostrarSnackBarPeligro('Error Acceso', resp.mensaje);
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._alertService.mostrarSnackBarError('Error Sistema', 'Hubo un error interno del sistema, intente más tarde.');
        this.mostrarLoading = false;
      }
    });

  }
}
