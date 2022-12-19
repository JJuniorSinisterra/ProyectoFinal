import { Component, OnInit } from '@angular/core';
import { ContactoModel } from 'src/app/models/contacto-model';
import { ContactosService } from 'src/app/services/contactos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {

  contactos:ContactoModel[]=[];

  constructor(private contactoSvc:ContactosService) { }

  ngOnInit(): void {
    this.contactoSvc.getContactos().subscribe(res=>{
      this.contactos = [];
      res.forEach((element:ContactoModel)=>{
        this.contactos.push({
          ...element
        })
      })
      console.log(this.contactos)
    })
  }

  eliminar(id:any, contactoNom:string){

    Swal.fire({
      icon:'question',
      title: `Desea eliminar el mensaje de ${contactoNom}`,
      showCancelButton: true,
      confirmButtonText:'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed){
        this.contactoSvc.eliminarContacto(id,contactoNom);
      }
    })


  }

}
