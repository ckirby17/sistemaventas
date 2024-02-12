import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VentaDetalleCrear } from 'src/app/interfaces/models/venta-detalle-crear';
import { VentaDetalleEditar } from 'src/app/interfaces/models/venta-detalle-editar';
import { ResponseApi } from 'src/app/interfaces/responses/response-api';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaDetalleService {

  private modulo: string = 'VentaDetalle/';
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

  listarPorVenta(ventaId: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(this.urlApi + 'ListarPorVenta/' + ventaId, this.httpOptions);
  }

  crear(modelo: VentaDetalleCrear): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(this.urlApi + 'Crear', modelo, this.httpOptions);
  }

  editar(modelo: VentaDetalleEditar): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(this.urlApi + 'Editar', modelo, this.httpOptions);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(this.urlApi + 'Eliminar/' + id, this.httpOptions);
  }
}
