import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  mostrarDialogoError(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0b5ed7'
    });
  }

  mostrarDialogoInfo(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'info',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0b5ed7'
    });
  }

  mostrarDialogoConsulta(titulo: string, mensaje: string) {
    const dialaog = Swal.fire({
        title: titulo,
        text: mensaje,
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        icon: 'question',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#bb2d3b'
    });

    return dialaog;
  }

  mostrarDialogoExito(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0b5ed7'
    });
  }

  mostrarDialogoPeligro(titulo: string, mensaje: string){
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0b5ed7'
    });
  }
}
