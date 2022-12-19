import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HotelesComponent} from './hoteles/hoteles.component';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HabitacionesComponent } from './habitaciones/habitaciones.component';
import { SlidersComponent } from './sliders/sliders.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { IteminfosComponent } from './iteminfos/iteminfos.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HotelesComponent,
    PagesComponent,
    HabitacionesComponent,
    SlidersComponent,
    MensajesComponent,
    IteminfosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    DashboardComponent,
    HotelesComponent,
    HabitacionesComponent,
    SlidersComponent,
    IteminfosComponent

  ]
})
export class PagesModule { }
