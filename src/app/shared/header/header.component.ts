import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems?:any[];
  usuario:any;
  user:any;
  userImgGoogle:any;



  constructor(private sideBarServices: SidebarService, private router:Router, private authSvc:AuthService) {
    this.menuItems= this.sideBarServices.menu;

   }

  ngOnInit() {

    this.obtenerUsuario();
    $('[data-widget="treeview"]').Treeview('init');

   }

   async obtenerUsuario(){

    this.usuario = await this.authSvc.getCurrentUser();
    if (this.usuario) {

            this.user=this.usuario.email;
            this.userImgGoogle= this.usuario.photoURL;

    }

   }


  async logout(){
    await this.authSvc.logout();
  }
}
