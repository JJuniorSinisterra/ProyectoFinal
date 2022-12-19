import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageprincipalComponent } from './pageprincipal/pageprincipal.component';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { PagesComponent } from './pages/pages.component';


const routes:Routes=[

  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'principal', component:PageprincipalComponent}

]

@NgModule({

  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
