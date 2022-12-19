import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { HabitacionModel } from 'src/app/models/habitacion-model';
import { HotelModel } from 'src/app/models/hotel-model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { HotelesService } from 'src/app/services/hoteles.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css']
})
export class HabitacionesComponent implements OnInit {

  habitaciones:HabitacionModel[]=[];
  hoteles:HotelModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;

  habitacionForm = this.fb.group({
    tipo:['',[Validators.required]],
    precio:['',[Validators.required]],
    hotel:['',Validators.required],
    temporada:['',[Validators.required]]
  })

constructor(private router:Router, private fb:FormBuilder, private habitacionSvc:HabitacionesService, private hotelSvc:HotelesService) { }

  ngOnInit(): void {

    this.habitacionSvc.getHabitaciones().subscribe(res=>{
      this.habitaciones = [];
      res.forEach((element:HabitacionModel)=>{
        this.habitaciones.push({
          ...element
        })
      })
      console.log(this.habitaciones)
    })

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



  registrarHabitacion( ){
    let cargaHabitacion:any={
      tipoHabitacion: this.habitacionForm.value.tipo,
      precioHabitacion: this.habitacionForm.value.precio,
      hotelHabitacion: this.habitacionForm.value.hotel

      
    }

    this.habitacionSvc.cargarHabitacionFirebase(this.imagenes,cargaHabitacion);

  }

  eliminar(id:any, habitacionTipo:string){

    Swal.fire({
      icon:'question',
      title: `Desea eliminar la habitacion ${habitacionTipo}`,
      showCancelButton: true,
      confirmButtonText:'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed){
        this.habitacionSvc.eliminarHabitacion(id,habitacionTipo);
      }
    })


  }

  limpiarForm(){
    this.habitacionForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }





}



