import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators} from '@angular/forms';
import { ContactoModel } from 'src/app/models/contacto-model';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  contactos:ContactoModel[]=[];

  contactoForm = this.fb.group({
    nombre:['',[Validators.required]],
    correo:['',[Validators.required]],
    mensaje:['',[Validators.required]]
  })

  constructor(private router:Router, private fb:FormBuilder, private contactoSvc:ContactosService) { }

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

  registrarContacto(){
    let cargaContacto:any={
      nombre: this.contactoForm.value.nombre,
      correo: this.contactoForm.value.correo,
      mensaje: this.contactoForm.value.mensaje
    }

    this.contactoSvc.cargarContactoFirebase(cargaContacto);

  }

  limpiarForm(){
    this.contactoForm.reset();
  }


}
