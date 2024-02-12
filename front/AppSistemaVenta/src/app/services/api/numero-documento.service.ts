import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NumeroDocumentoCrear } from 'src/app/interfaces/models/numero-documento-crear';
import { NumeroDocumentoEditar } from 'src/app/interfaces/models/numero-documento-editar';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NumeroDocumentoService {

  private modulo: string = 'NumeroDocumento/';
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

  crear(modelo: NumeroDocumentoCrear): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Crear', modelo, this.httpOptions);
  }

  editar(modelo: NumeroDocumentoEditar): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + 'Editar', modelo, this.httpOptions);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + 'Eliminar/' + id, this.httpOptions);
  }
}
