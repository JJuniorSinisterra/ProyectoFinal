import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PosthotelesComponent } from './posthoteles/posthoteles.component';
import { PosthabitacionesComponent } from './posthabitaciones/posthabitaciones.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'hoteles',component:PosthotelesComponent},
  {path:'contacto',component:ContactoComponent},
  {path:'habitaciones',component:PosthabitacionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageprincipalRoutingModule { }
