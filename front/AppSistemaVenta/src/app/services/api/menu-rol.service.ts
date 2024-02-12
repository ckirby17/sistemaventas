import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuRolCrear } from 'src/app/interfaces/models/menu-rol-crear';
import { MenuRolEditar } from 'src/app/interfaces/models/menu-rol-editar';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuRolService {

  private modulo: string = 'MenuRol/';
  private urlApi: string = environment.apiUrl + this.modulo;

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  };

  listar(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.urlApi + 'Listar', this.httpOptions);
  }

  obtener(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.urlApi + 'Obtener/' + id, this.httpOptions);
  }

  obtenerMenusPorRol(rolId: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.urlApi + 'ObtenerPorRol/' + rolId, this.httpOptions);
  }

  crear(modelo: MenuRolCrear): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Crear', modelo, this.httpOptions);
  }

  registrar(modelo: MenuRolCrear[]): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Registrar', modelo, this.httpOptions);
  }

  editar(modelo: MenuRolEditar): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + 'Editar', modelo, this.httpOptions);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + 'Eliminar/' + id, this.httpOptions);
  }
}
