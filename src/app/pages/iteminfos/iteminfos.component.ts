import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { IteminfoModel } from 'src/app/models/iteminfo-model';
import { IteminfosService } from 'src/app/services/iteminfo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iteminfos',
  templateUrl: './iteminfos.component.html',
  styleUrls: ['./iteminfos.component.css']
})
export class IteminfosComponent implements OnInit {

  iteminfos:IteminfoModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;

  iteminfoForm = this.fb.group({
    titulo:['',[Validators.required]],
    texto:['',[Validators.required]],
    lado:['',[Validators.required]],
    imagen:['',[Validators.required]]
  })


  constructor(private router:Router, private fb:FormBuilder, private iteminfoSvc:IteminfosService) { }

  ngOnInit(): void {

    this.iteminfoSvc.getIteminfos().subscribe(res=>{
      this.iteminfos = [];
      res.forEach((element:IteminfoModel)=>{
        this.iteminfos.push({
          ...element
        })
      })
      console.log(this.iteminfos)
    })

  }
  selectChange(event:any){

    if(event.target.files.length > 0){

      this.file = event.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(this.file[0]);
      reader.onloadend = (event:any)=>{

        this.imgURL = event.target.result;

        this.imagenes.push({
          archivo:this.file[0]
        })
      }

    }else{

      this.imgURL;

    }
  }


  registrarIteminfo(){
    let cargaIteminfo:any={
      tituloItem: this.iteminfoForm.value.titulo,
      textoItem: this.iteminfoForm.value.texto,
      ladoItem: this.iteminfoForm.value.lado,
    }

    this.iteminfoSvc.cargarIteminfoFirebase(this.imagenes,cargaIteminfo);

  }

  eliminar(id:any, IteminfoTitulo:string){

    Swal.fire({
      icon:'question',
      title: `Desea eliminar la habitacion ${IteminfoTitulo}`,
      showCancelButton: true,
      confirmButtonText:'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed){
        this.iteminfoSvc.eliminarIteminfo(id,IteminfoTitulo);
      }
    })


  }

  limpiarForm(){
    this.iteminfoForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }

}
