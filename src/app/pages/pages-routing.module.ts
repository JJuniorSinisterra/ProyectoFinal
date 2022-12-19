import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { AuthGuard } from '../guards/auth.guard';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { SlidersComponent } from './sliders/sliders.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { IteminfosComponent } from './iteminfos/iteminfos.component';


const routes:Routes=[
  {path:'dashboard', component:PagesComponent, canActivate:[AuthGuard],
  children:[
    {path:'', component:DashboardComponent, data:{titulo:'Dashboard'}},
    {path:'hoteles', component:HotelesComponent, data:{titulo:'Hoteles'}},
    {path:'habitaciones', component:HabitacionesComponent, data:{titulo:'Habitaciones'}},
    {path: 'sliders', component:SlidersComponent, data:{titulo:'Conf. Slider'}},
    {path: 'mensajes', component:MensajesComponent, data:{titulo:'Mensajes'}},
    {path: 'iteminfos', component:IteminfosComponent,data:{titulo:'Conf. Intem Info'}}
  ]
}
]


@NgModule({

  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
