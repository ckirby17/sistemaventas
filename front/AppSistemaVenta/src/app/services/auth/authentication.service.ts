import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Login } from 'src/app/interfaces/models/login';
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { SessionUsuario } from 'src/app/interfaces/auth/session-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private modulo: string = 'Usuario/';
  private urlApi: string = environment.apiUrl + this.modulo;
  private SESSION_KEY: string = 'SessionUsuario';

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  loginAuthenticate(login: Login): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'ValidarCredencial', login);
  }

  guardarSesionUsuario(sessionUsuario: SessionUsuario){
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionUsuario));
  }

  obtenerSesionUsuario() : SessionUsuario {
    const dataLocal = localStorage.getItem(this.SESSION_KEY);

    const sesionUsuario = JSON.parse(dataLocal!);

    return sesionUsuario;
  }

  removeSessionUsuario() {
    localStorage.removeItem(this.SESSION_KEY);
  }
}
