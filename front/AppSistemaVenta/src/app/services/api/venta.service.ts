import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialVenta } from 'src/app/interfaces/models/historial-venta';
import { VentaCrear } from 'src/app/interfaces/models/venta-crear';
import { VentaEditar } from 'src/app/interfaces/models/venta-editar';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private modulo: string = 'Venta/';
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

  obtenerHistorial(modelo: HistorialVenta): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'ObtenerHistorial', modelo ,this.httpOptions);
  }

  registrar(modelo: VentaCrear): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Registrar', modelo, this.httpOptions);
  }

  editar(modelo: VentaEditar): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + 'Editar', modelo, this.httpOptions);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + 'Eliminar/' + id, this.httpOptions);
  }
}
