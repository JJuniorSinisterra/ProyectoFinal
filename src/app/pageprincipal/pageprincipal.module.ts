import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PageprincipalRoutingModule } from './pageprincipal-routing.module';
import { PosthotelesComponent } from './posthoteles/posthoteles.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './home/slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { ContactoComponent } from './contacto/contacto.component';
import { PosthabitacionesComponent } from './posthabitaciones/posthabitaciones.component';
import { ItemInfoComponent } from './home/item-info/item-info.component';
import { from } from 'rxjs';


@NgModule({
  declarations: [
    PosthotelesComponent,
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    ItemInfoComponent ,
    ContactoComponent,
    PosthabitacionesComponent
  ],
  imports: [
    CommonModule,
    PageprincipalRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent
  ]
})
export class PageprincipalModule { }
