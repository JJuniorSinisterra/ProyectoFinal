import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { SliderModel } from 'src/app/models/slider-model';
import { SlidersService } from 'src/app/services/sliders.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css']
})
export class SlidersComponent implements OnInit {

  sliders:SliderModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;

  sliderForm = this.fb.group({
    titulo:['',[Validators.required]],
    texto:['',[Validators.required]],
    imagen:['',[Validators.required]]
  })

constructor(private router:Router, private fb:FormBuilder, private sliderSvc:SlidersService) { }

  ngOnInit(): void {

    this.sliderSvc.getSliders().subscribe(res=>{
      this.sliders = [];
      res.forEach((element:SliderModel)=>{
        this.sliders.push({
          ...element
        })
      })
      console.log(this.sliders)
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



  registrarSlider(){
    let cargaSlider:any={
      tituloSlider: this.sliderForm.value.titulo,
      textoSlider: this.sliderForm.value.texto,
    }

    this.sliderSvc.cargarSliderFirebase(this.imagenes,cargaSlider);

  }

  eliminar(id:any, SliderTitulo:string){

    Swal.fire({
      icon:'question',
      title: `Desea eliminar la habitacion ${SliderTitulo}`,
      showCancelButton: true,
      confirmButtonText:'Aceptar',
      allowOutsideClick: false
    }).then((result)=>{
      if(result.isConfirmed){
        this.sliderSvc.eliminarSlider(id,SliderTitulo);
      }
    })


  }

  limpiarForm(){
    this.sliderForm.reset();
    this.imgURL = '../../../assets/noimage.png';
  }



}



