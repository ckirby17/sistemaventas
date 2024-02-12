import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubMenuCrear } from 'src/app/interfaces/models/sub-menu-crear';
import { SubMenuEditar } from 'src/app/interfaces/models/sub-menu-editar';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubMenuService {

  private modulo: string = 'SubMenu/';
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

  crear(modelo: SubMenuCrear): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Crear', modelo, this.httpOptions);
  }

  editar(modelo: SubMenuEditar): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + 'Editar', modelo, this.httpOptions);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + 'Eliminar/' + id, this.httpOptions);
  }
}
