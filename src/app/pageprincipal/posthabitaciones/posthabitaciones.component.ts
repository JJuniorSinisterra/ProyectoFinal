import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FileItems } from 'src/app/models/file-items';
import { HabitacionModel } from 'src/app/models/habitacion-model';
import { HotelModel } from 'src/app/models/hotel-model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { HotelesService } from 'src/app/services/hoteles.service';

@Component({
  selector: 'app-posthabitaciones',
  templateUrl: './posthabitaciones.component.html',
  styleUrls: ['./posthabitaciones.component.css']
})
export class PosthabitacionesComponent implements OnInit {

  habitaciones:HabitacionModel[]=[];
  hoteles:HotelModel[]=[];
  imagenes:FileItems[]=[];
  imgURL = '../../../assets/noimage.png';
  file:any;


  constructor(private habitacionSvc:HabitacionesService, private hotelSvc:HotelesService ) { }

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



}
