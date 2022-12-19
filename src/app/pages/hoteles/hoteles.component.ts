import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { HotelModel } from 'src/app/models/hotel-model';
import { HotelesService } from 'src/app/services/hoteles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {


  hoteles:HotelModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;
  itemEditar:any={name:''};

  hotelForm = this.fb.group({
    nombre:['',[Validators.required]],
    direccion:['',[Validators.required]],
    estrella:['',[Validators.required]]
  })

constructor(private router:Router, private fb:FormBuilder, private hotelSvc:HotelesService) { }

  ngOnInit(): void {

    this.hotelSvc.getHoteles().subscribe(res=>{
      this.hoteles = [];
      res.forEach((element:HotelModel)=>{
        this.hoteles.push({
          ...element
        })
      })
      console.log(this.hoteles)
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



  registrarHotel(){
    let cargaHotel:any={
      nomHotel: this.hotelForm.value.nombre,
      direccionHotel: this.hotelForm.value.direccion,
      estrellasHotel: this.hotelForm.value.estrella
    }

    this.hotelSvc.cargarHotelFirebase(this.imagenes,cargaHotel);

  }

  eliminar(id:any, hotelNom:string){

    Swal.fire({
      icon:'question',
      title: `Desea eliminar el hotel ${hotelNom}`,
      showCancelButton: true,
      confirmButtonText:'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed){
        this.hotelSvc.eliminarHotel(id,hotelNom);
      }
    })


  }


  limpiarForm(){
    this.hotelForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }


}
