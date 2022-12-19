import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu:any[]=[{
    titulo:'Dashboard',
    icono:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {titulo:'Hoteles', url:'hoteles', icono:'fa fa-hotel'},
      {titulo:'Habitaciones', url:'habitaciones', icono:'fa fa-bed'},
      {titulo:'Mensajes', url:'mensajes', icono:'fa fa-envelope'},

    ],

  }]


}
